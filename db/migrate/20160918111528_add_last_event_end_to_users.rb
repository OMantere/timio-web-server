class AddLastEventEndToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :last_event_end, :hstore, default: '', null: false
  end
end
