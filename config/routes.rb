Rails.application.routes.draw do
  resources :users
  resources :session

  namespace :api, defaults: {:format => :json} do 
    
  end
  
end
