require 'jwt'
require 'date'
require 'digest/md5'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :create_client_token



  def serialize
    { email: self.email }
  end

  def events_to_usages(events)
    def new_app_usage(json)
      app_usage = {}
      app_usage['start'] = Time.at(json['time']).to_datetime
      name = json['appName']
      app_usage['name'] = name
      app_usage['color'] = '#' + Digest::MD5.hexdigest(name)[0..5]
      app_usage['device'] = json['device']
      app_usage
    end

    def store_app_usage(app_usage, event)
      end_time = Time.at(event['time']).to_datetime
      app_usage['end'] = end_time
      AppStat.add_to_stats(self, app_usage)
      app_usage_record = AppUsage.new(app_usage)
      app_usage_record.user_id = self.id
      app_usage_record.save!
      self.last_event_end[app_usage['device']] = event['time']
    end

    current_app_usage = nil
    new_events = events.select { |event|
      # Process only new events
      event['time'] >= self.get_last_event_end(event['device']).to_i
    }
    new_events.each do |event|
      if event['eventType'] == 'start'
        # If there is no previous app started
        if current_app_usage.nil?
          current_app_usage = new_app_usage event
        else # There is an app already started
          store_app_usage current_app_usage, event    # Store the current app usage
          current_app_usage = new_app_usage event     # and start a new one
        end
      elsif event['eventType'] == 'stop'
        unless current_app_usage.nil?                 # Store the current app if there is one
          store_app_usage current_app_usage, event
          current_app_usage = nil
        end
      else
        puts "Undefined event type #{event['eventType']}"
      end
    end
    self.save!
  end

  def get_last_event_end(type)
    if self.last_event_end[type].nil?
      0
    else
      self.last_event_end[type]
    end
  end


  protected

  def create_client_token
    payload = { data: "#{self.email} #{self.created_at.to_s}" }
    jwt_secret = ENV['PRODUCTION'] ? ENV['TIMIO_JWT_SECRET'] : 'fakesecret'
    token = JWT.encode payload, jwt_secret, 'HS256'
    self.update!(client_token: token)
    token
  end
end
