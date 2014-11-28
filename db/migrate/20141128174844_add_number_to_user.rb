class AddNumberToUser < ActiveRecord::Migration
  def change
    add_column :users, :phone_number, :string
    add_column :users, :email, :string
  end
end
