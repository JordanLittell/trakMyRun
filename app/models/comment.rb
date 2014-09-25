class Comment < ActiveRecord::Base
	validates :user_id, :content, presence: true 
end
