class Map < ActiveRecord::Base
	validates :user_id, :path_string, :total_miles, presence: true
end
