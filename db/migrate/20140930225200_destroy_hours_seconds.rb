class DestroyHoursSeconds < ActiveRecord::Migration
  def change
  	remove_column :posts, :hours
  	remove_column :posts, :seconds
  end
end
