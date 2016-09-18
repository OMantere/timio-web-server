class AppStat < ApplicationRecord
  belongs_to :user

  def self.get_user_stats(user)
    stats = AppStat.where(user_id: user.id)
    return {} if stats.nil?
   stats_hash = {}
    stats.each do |stat|
      stats_hash[stat.name] = { total_millis: stat.total_seconds }
    end
    stats_hash
  end
end
