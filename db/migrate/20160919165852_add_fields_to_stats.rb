class AddFieldsToStats < ActiveRecord::Migration[5.0]
  def change
    add_column :app_stats, :android_seconds, :integer, limit: 8, default: 0
    add_column :app_stats, :osx_seconds, :integer, limit: 8, default: 0
  end
end
