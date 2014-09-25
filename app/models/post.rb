class Post < ActiveRecord::Base
	validates :user_id, :workout_type, presence: true	
	belongs_to :user
	has_many :comments
	before_destroy :confirm_user

	def confirm_user 
		unless current_user.id == self.user_id 
			errors.add_to_base "you can't delete another user's activity"
			return false
		end
	end
end
