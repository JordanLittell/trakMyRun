class AddElevationToMaps < ActiveRecord::Migration
  def change
  	add_column :maps, :elevations, :text
  end
end
