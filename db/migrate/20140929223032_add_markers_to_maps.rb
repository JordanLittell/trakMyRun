class AddMarkersToMaps < ActiveRecord::Migration
  def change
  	add_column :maps, :markers, :text
  end
end
