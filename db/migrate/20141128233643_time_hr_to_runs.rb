class TimeHrToRuns < ActiveRecord::Migration
  def change
    add_column :maps, :minutes, :integer 
    add_column :maps, :heart_rate, :integer
    add_column :maps, :calories, :integer
  end
end
