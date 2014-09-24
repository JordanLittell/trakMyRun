class Post < ActiveRecord::Base
	validates :user_id, :workout_type, presence: true	
end
