class UsersController < ApplicationController
  def new
  	@user = User.new 
  	render :new 
  end

  def create 
  	@user = User.new(user_params)
  	if @user.save 
  		log_in!(@user)
  		redirect_to root_url
  	else 
  		flash.now[:errors] = @user.errors.full_messages
  		render :new
  	end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      flash[:success] = ["Request completed"]
      redirect_to :root
    end
  end

  def destroy 
  end

  private

  def user_params 
  	params.require(:users).permit(:username, :password, :image_url)
  end
end
