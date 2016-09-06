Rails.application.routes.draw do
  devise_for :users

  get 'home/index'

  root to: "home#index"

  #Send all routes to the index view, we'll handle routing in React
  get '(*asdf)' => 'home#index'
end
