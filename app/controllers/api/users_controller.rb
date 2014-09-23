module Api
	class UsersController < ApplicationController

	  def show 
	  	@user = User.find(params[:id])
	  	render "show"	
	  end
	end

	private

	def user_params 
		params.require(:user).permit(:username,:password);
	end
end
