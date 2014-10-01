module Api
	class PostsController < ApplicationController
		def create 
			@post = Post.new(post_params)
			@post.user_id = current_user.id
			if @post.save
				redirect_to root_url
			else
				render "users/show"
			end
		end

		def new 
			@post = Post.new()
		end

		def destroy 
			@post = Post.find(params[:id])
			@user = current_user
			@posts = @user.posts
			if @post.delete
				render "users/show"
			else
				render "users/show"
			end
		end

		private 

			def post_params 
				params.require(:post).permit(:user_id, :workout_type, :workout_type, :heart_rate, :minutes, :calories)
			end
	end

end
