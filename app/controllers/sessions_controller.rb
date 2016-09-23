class SessionsController < Devise::SessionsController
  respond_to :json  # To be able to authenticate via AJAX
end