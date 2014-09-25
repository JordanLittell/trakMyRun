
module Api
	class CommentsController < ApplicationController
		def create
			@comment = Comment.new(comment_params)
			if @comment.save
				render "users/show"
			end
		end

		def edit
			@comment = Comment.find(params[:id])			
		end

		def new
			@comment = Comment.new
		end

		def update 
			@comment = Comment.find(params[:id])
			if @comment.update!(comment_params)
				render "users/show"
			end
		end

		private 

		def comment_params
			param.require(:commnt).permit(:id, :content, :user_id)
		end
	end
end
