class RenameAppStatColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :app_stats, :total_millis, :total_seconds
  end
end
