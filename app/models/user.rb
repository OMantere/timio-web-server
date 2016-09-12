require 'jwt'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :create_client_token

  def create_client_token
    payload = { data: self.email + self.created_at.to_s }
    jwt_secret = ENV['PRODUCTION'] ? ENV['TIMIO_JWT_SECRET'] : 'fakesecret'
    token = JWT.encode payload, jwt_secret, 'HS256'
    self.update!(client_token: token)
  end



  def events_to_db(events)
    def new_app_usage(json)
      app_usage = {}
      app_usage['start'] = json['time']
      app_usage['app_name'] = json['appName']
    end

    def create_app_usage(app_usage, event)
      app_name = app_usage['app_name']
      end_time = event['time']
      elapsed_time = end_time - app_usage['start']

      if (app_stat = AppStat.where(user_id: self.id, name: app_name).first).nil?
        app_stat = AppStat.create!(user_id: self.id, name: app_name)
      end
      app_stat.update!(total_millis: app_stat.total_millis + end_time)

      app_usage['end'] = end_time
      app_usage_record = AppUsage.new!(app_usage)
      app_usage_record.user_id = self.id
      app_usage_record.save!
    end

    def process_events(json_array)
      current_app_usage = nil

      json_array.each do |event|
        if event['eventType'] == 'start'
          if current_app_usage.nil?
            current_app_usage = new_app_usage event
          else
            create_app_usage current_app_usage, event
            current_app_usage = nil
          end
        elsif event['eventType'] == 'stop'
          unless current_app_usage.nil?
            create_app_usage current_app_usage, event
            current_app_usage = nil
          end
        else
          puts "Undefined event type #{event['eventType']}"
        end
      end
    end

    batch = process_events events

  end
end
