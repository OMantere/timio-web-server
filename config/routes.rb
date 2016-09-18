Rails.application.routes.draw do
  devise_for :users

  post 'api/client/get_token'
  put 'api/client/push_data'

  devise_scope :user do
    get 'home/index'

    namespace :api do
      resources :app_usage, :app_stat
    end
  end

  root to: "home#index"

  #Send all routes to the index view, we'll handle routing in React
  get '(*asdf)' => 'home#index'
end
