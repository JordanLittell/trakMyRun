class StaticPagesController < ApplicationController
  def root
  	redirect_to new_sessions_url unless current_user
  end
end
