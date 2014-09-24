module Api
	class PostsController < ApplicationController
		def create 
			@post = Post.new(post_params)
			@post.user_id = current_user.id
			@post.calories = 300
			redirect_to root_url if @post.save
		end

		def new 
			@post = Post.new()
		end

		private 

			def post_params 
				params.require(:post).permit(:user_id, :workout_type, :hours, :minutes, :seconds, :calories)
			end
	end

end
