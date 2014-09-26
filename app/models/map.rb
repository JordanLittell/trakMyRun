class Map < ActiveRecord::Base
	validates :user_id, :total_miles, presence: true
	belongs_to :user
end
