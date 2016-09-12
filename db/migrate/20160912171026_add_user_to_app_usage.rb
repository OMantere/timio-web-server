class AddUserToAppUsage < ActiveRecord::Migration[5.0]
  def change
    add_reference :app_usages, :user, foreign_key: true
  end
end
