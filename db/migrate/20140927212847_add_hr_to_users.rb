class AddHrToUsers < ActiveRecord::Migration
  def change
  	add_column :posts, :heart_rate, :integer
  end
end
