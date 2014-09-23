Rails.application.routes.draw do
  get 'static_pages/root'

  root to: "static_pages#root"
  resources :users, except: [:show, :index]
  resources :session

  namespace :api, defaults: {:format => :json} do 
    resources :users, only: [:show, :index]
  end
  
end
