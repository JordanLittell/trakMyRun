class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  def current_user 
  	User.find_by_session_token(session[:token]);
  end

  def log_in!(user)
  	session[:token] = user.session_token 
  end

  def log_out!
  	session[:token] = nil
  	current_user.reset_session_token
  end

end
