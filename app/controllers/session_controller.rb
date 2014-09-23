class SessionController < ApplicationController
	def new 
		@user = User.new
	end

	def create 
		@user = User.find_by_credentials(params[:user][:username], params[:user][:password])
		if @user.nil?
			flash.now[:errors] = ["Your request could not be processed"]
			render :new
		else 
			log_in!(@user)
			render :json => @user
		end
	end

	def destroy
		if current_user 
			log_out!
		end
	end
end
