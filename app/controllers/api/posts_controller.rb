module Api
	class PostsController < ApplicationController
		def create 
			@post = Post.new(post_params)
			@post.user_id = current_user.id
			redirect_to root_url if @post.save
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
				params.require(:post).permit(:user_id, :workout_type, :hours, :minutes, :seconds, :calories)
			end
	end

end
