	module Api
		class UsersController < ApplicationController
			def show 
				redirect_to new_sessions_url unless current_user
				@user = User.find(params[:id])
				@posts = @user.posts
				render "show"	
			end

			def index 
				@users = User.all
				render "index"
			end

			def update 
				@user = User.find(params[:id])
				@posts = @user.posts
				if params[:old_password]
					if !@user.valid_password?(params[:old_password])
						flash.now[:errors] = ["You're password is incorrect"]
						render "show"
					else
						@user.password_digest = BCrypt::Password.create(params[:new_password])
						render "show"
					end
				else
					if @user.update!(user_params)
						render "show"
					else 
						flash.now[:errors] = @user.errors.full_messages
						render "show"
					end
				end
			end

			def edit 
				@user = User.find(params[:id])
			end

			private 
			def user_params
				params.require(:user).permit(
					:id,
					:username, 
					:age, 
					:weight, 
					:gender, 
					:height,
				)
			end
		end

	end
