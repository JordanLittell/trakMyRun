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
  end

  def edit 
  	@user = User.find(params[:id])
  	if @user.update(user_params)
  		render :show
  	else 
  		flash.now[:errors] = @user.errors.full_messages
  		render :show
  	end
  end

  def destroy 
  end

  private

  def user_params 
  	params.require(:user).permit(:username, :password)
  end
end
