Rails.application.routes.draw do

  root to: "static_pages#root"
  resources :users, except: [:show, :index]
  resource :sessions

  namespace :api, defaults: {:format => :json} do 
    resources :users, only: [:show, :index]
    resources :posts
  end
  
end
