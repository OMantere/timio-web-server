class CreateAppStats < ActiveRecord::Migration[5.0]
  def change
    create_table :app_stats do |t|
      t.string :name
      t.integer :total_millis, limit: 8, default: 0
      t.timestamps
    end
  end
end
