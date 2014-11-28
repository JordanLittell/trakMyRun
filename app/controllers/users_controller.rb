class UsersController < ApplicationController
  def new
  	@user = User.new 
  	render :new 
  end

  def create 
  	@user = User.new(user_params)
    
  	if @user.save 
  		log_in!(@user)

      if @user.phone_number 
        @client = twilio
        send_message("Hello! Welcome to TrakMyRun", @user.phone_number, @client)
      end
      
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
  	params.require(:users).permit(:username, :password, :image_url, :email, :phone_number)
  end
end
