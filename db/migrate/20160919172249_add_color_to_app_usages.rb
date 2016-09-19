class AddColorToAppUsages < ActiveRecord::Migration[5.0]
  def change
    add_column :app_usages, :color, :string
  end
end
