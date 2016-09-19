class AppUsage < ApplicationRecord
  belongs_to :user

  validates :device, inclusion: { in: %w(osx android), message: '%{value} is not valid' }

  def self.get_user_usages(user)
    android = AppUsage.where({ user_id: user.id, device: 'android'})
    osx = AppUsage.where({ user_id: user.id, device: 'osx'})
    { android: android, osx: osx }
  end

end
