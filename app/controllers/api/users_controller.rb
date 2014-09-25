	module Api
		class UsersController < ApplicationController
			def show 
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
				if @user.update!(user_params)
					render "show"
				else 
					flash.now[:errors] = @user.errors.full_messages
					render "show"
				end
			end

			def edit 
				@user = User.find(params[:id])
			end

			private 
			def user_params
				params.require(:user).permit(:id,:username, :age, :weight, :gender, :height)
			end
		end

	end
