class AppStat < ApplicationRecord
  belongs_to :user

  def self.get_user_stats(user)
    stats = AppStat.where(user_id: user.id)
    return [] if stats.nil?
   stats_array = []
    stats.each do |stat|
      stats_array << { name: stat.name, total_seconds: stat.total_seconds }
    end
    stats_array
  end
end
