class Post < ActiveRecord::Base
	validates :user_id, :workout_type, presence: true	
	belongs_to :user
	has_many :comments
end
