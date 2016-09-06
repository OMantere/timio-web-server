class CreateAppUsages < ActiveRecord::Migration[5.0]
  def change
    create_table :app_usages do |t|
      t.string :app_name
      t.date :start
      t.date :end

      t.timestamps
    end
  end
end
