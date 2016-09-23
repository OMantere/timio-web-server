Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions' }

  post 'api/client/get_token'
  put 'api/client/push_data'


  namespace :api, defaults: { format: :json }, path: "/api" do
    resources :app_usage, :app_stat, :user
  end

  root to: "home#index"

  #Send all routes to the index view, we'll handle routing in React
  get '(*asdf)' => 'home#index'
end
