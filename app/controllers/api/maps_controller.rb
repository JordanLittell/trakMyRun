module Api
	class MapsController < ApplicationController
		def new 
		end

		def create 
			@map = Map.new(map_params)
			@map.user_id = current_user.id
			@map.name = "map"
			
			if @map.save
				render :new
			end
		end

		def show 
			@map = Map.find(params[:id])
		end 

		def map_params
			params.require(:map).permit(:path, :total_miles, :name, :elevations, :markers, :elevation_gain, :calories, :minutes, :heart_rate)
		end

	end
end