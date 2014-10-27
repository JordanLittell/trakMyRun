class StaticPagesController < ApplicationController
  def root
  	redirect_to home_url unless current_user
  end
end
