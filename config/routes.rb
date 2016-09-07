Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    get 'home/index'
    post 'api/get_client_token'
    put 'api/push/client_data'
  end

  root to: "home#index"

  #Send all routes to the index view, we'll handle routing in React
  get '(*asdf)' => 'home#index'
end
