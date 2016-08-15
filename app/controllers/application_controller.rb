

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :twilio, :send_message

  def current_user 
  	User.find_by_session_token(session[:token]);
  end

  def twilio
    # To find these visit https://www.twilio.com/user/account
    #require 'twilio-ruby'
    #account_sid = "ACa10aec94c8d1c2a0f157b7639ca373b5"
    #auth_token = "7680119fffc4c651147e7db465d8cdbc"
    #Twilio::REST::Client.new account_sid, auth_token
  end

  def send_message(message, number, client)
    #@message = client.account.messages.create({:to => number,
    #                               :from => "+16503895324",
    #                               :body => message})
  end

  def log_in!(user)
  	session[:token] = user.session_token 
  end

  def log_out!(user)
  	session[:token] = nil
  	user.reset_session_token
  end

end
