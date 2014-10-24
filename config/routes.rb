Rails.application.routes.draw do

  root to: "static_pages#root"
  resources :users, except: [:show, :index]
  get 'home', to: 'static_pages#home'
  resource :sessions

  namespace :api, defaults: {:format => :json} do 
    resources :users, only: [:show, :index, :edit, :update]
    resources :posts
    resources :comments, only: [:create, :destroy, :new]	
    resources :maps
  end
  
end
