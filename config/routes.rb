Rails.application.routes.draw do
  devise_scope :user do
    root to: 'devise/sessions#new'
  end

  authenticate :user do
    get '/dashboard', to: 'dashboard#index', as: 'dashboard'
    get '/getS3Options', to: 'dashboard#s3_access_token', as: 'access_token'
  end

  devise_for :users

  namespace :api do
    namespace :v1 do
      authenticate :user do
        resources :sermons, only: [:create]
      end

      resources :sermons, only: [:index, :show]
    end
  end
end
