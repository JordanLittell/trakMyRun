class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.string :type
      t.integer :hours
      t.integer :minutes
      t.integer :seconds
      t.integer :calories

      t.timestamps
    end
    add_index :posts, :user_id
  end
end
