Rails.application.routes.draw do
  resources :users, except: [:show]
  resources :session

  namespace :api, defaults: {:format => :json} do 
    resources :users, only: [:show]
  end
  
end
