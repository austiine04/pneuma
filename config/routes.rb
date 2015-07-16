Rails.application.routes.draw do
  root to: 'home#index'
  get '/dashboard', to: 'dashboard#index', as: 'dashboard'
  get '/getS3Options', to: 'dashboard#s3_access_token', as: 'access_token'
  devise_for :users
end
