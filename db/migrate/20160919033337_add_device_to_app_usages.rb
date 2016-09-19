class AddDeviceToAppUsages < ActiveRecord::Migration[5.0]
  def change
    add_column :app_usages, :device, :string
  end
end
