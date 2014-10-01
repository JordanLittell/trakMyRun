class AddElevationToMap < ActiveRecord::Migration
  def change
  	add_column :maps, :elevation_gain, :decimal 
  end
end
