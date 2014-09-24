class ChangeTypeColumn < ActiveRecord::Migration
  def change
  	rename_column :posts, :type, :workout_type
  end
end
