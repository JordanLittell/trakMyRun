class Map < ActiveRecord::Base
	validates :user_id, :total_miles, :elevations, :path, presence: true
	belongs_to :user
end
