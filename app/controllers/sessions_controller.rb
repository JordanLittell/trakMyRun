class SessionsController < ApplicationController
  def new 
    @user = User.new
  end

  def create 
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user.nil?
      flash.now[:errors] = ["We could not process your request."]
      render :new
    else 
      log_in!(@user)
      redirect_to root_url
    end
  end

  def destroy
    if current_user.nil? 
      redirect_to root_url
    else 
      log_out!(current_user)
      redirect_to new_sessions_url
    end
  end
end
