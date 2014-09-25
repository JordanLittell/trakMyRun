class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.integer :user_id 
      t.string :name
      t.text :path
      t.string :total_miles

      t.timestamps
    end
    add_index :maps, :user_id
  end
end
