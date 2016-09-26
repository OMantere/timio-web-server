class AddLastEventEndToUsers < ActiveRecord::Migration[5.0]
  def change
    enable_extension "hstore"
    add_column :users, :last_event_end, :hstore, default: '', null: false
  end
end
