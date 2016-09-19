class AppStat < ApplicationRecord
  belongs_to :user

  def self.add_to_stats(user, app_usage)
    name = app_usage['name']
    elapsed_seconds = (app_usage['end'] - app_usage['start']) * 1.days

    if (app_stat = AppStat.where(user_id: user.id, name: name).first).nil?
      app_stat = AppStat.create!(user_id: user.id, name: name)
    end

    app_stat.assign_attributes({ total_seconds: app_stat.total_seconds + elapsed_seconds })
    app_stat.assign_attributes({ android_seconds: app_stat.android_seconds + elapsed_seconds }) if app_usage['device'] == 'android'
    app_stat.assign_attributes({ osx_seconds: app_stat.osx_seconds + elapsed_seconds }) if app_usage['device'] == 'osx'
    app_stat.save!
  end

  def self.get_user_stats(user)
    stats = AppStat.where(user_id: user.id)
    return [] if stats.nil?
   stats_array = []
    stats.each do |stat|
      stats_array << stat.slice('name', 'total_seconds', 'android_seconds', 'osx_seconds')
    end
    stats_array
  end
end
