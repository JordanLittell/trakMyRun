class Add < ActiveRecord::Migration
  def change
  	add_column :maps, :latLn, :hstore
  end
end
