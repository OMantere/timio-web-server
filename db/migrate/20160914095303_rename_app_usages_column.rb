class RenameAppUsagesColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :app_usages, :app_name, :name
  end
end
