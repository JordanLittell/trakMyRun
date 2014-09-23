module Api
	class ActivitiesController < ApplicationController
		def create 
			@activity = Activity.new(activity_params)
			if @activity.save 
				render "show"
			else
				flash.now[:errors] = @activity.errors.full_messages 
				render "new"
			end
		end

		def new 
			@activity = Activity.new()
			render "new"
		end
	end

	private 

	def activity_params 
		params.require(:activity).permit(:user_id, :type, :hours, :minutes, :seconds, :calories)
	end
end
