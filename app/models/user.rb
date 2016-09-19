require 'jwt'
require 'date'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :create_client_token


  def events_to_usages(events)
    def new_app_usage(json)
      app_usage = {}
      app_usage['start'] = Time.at(json['time']).to_datetime
      app_usage['name'] = json['appName']
      app_usage['device'] = json['device']
      app_usage
    end

    def store_app_usage(app_usage, event)
      name = app_usage['name']
      end_time = Time.at(event['time']).to_datetime
      elapsed_seconds = (end_time - app_usage['start']) * 1.days

      if (app_stat = AppStat.where(user_id: self.id, name: name).first).nil?
        app_stat = AppStat.create!(user_id: self.id, name: name)
      end
      app_stat.update!(total_seconds: app_stat.total_seconds + elapsed_seconds)

      app_usage['end'] = end_time
      app_usage_record = AppUsage.new(app_usage)
      app_usage_record.user_id = self.id
      app_usage_record.save!
      self.last_event_end[app_usage['device']] = event['time']
    end

    current_app_usage = nil
    new_events = events.select { |event|
      puts event['time']
      puts self.get_last_event_end(event['device'])
      # Process only new events
      event['time'] > self.get_last_event_end(event['device']).to_i
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
