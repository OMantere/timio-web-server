require 'jwt'

class ApiController < DeviseController
  prepend_before_filter :require_no_authentication
  skip_before_filter :verify_authenticity_token
  before_action :ensure_params_exist, :only => [:get_client_token]
  before_action :process_access_token, :only => [:push_client_data]
  respond_to :json

  def get_client_token
    user = User.find_for_database_authentication(email: params[:user_login][:email])

    return invalid_login_attempt unless user

    if user.valid_password?(params[:user_login][:password])
      return render json: { success: true, client_token: user.client_token }
    end
    invalid_login_attempt
  end

  def push_client_data
    event_array = params['_json']

  end

  protected

  def process_access_token
    token = request.headers['Access-Token']
    jwt_secret = ENV['PRODUCTION'] ? ENV['TIMIO_JWT_SECRET'] : 'fakesecret'
    begin
      decoded = JWT.decode token, jwt_secret, 'HS256'
      puts decoded
    rescue JWT::DecodeError
      puts 'ApiController: Invalid access token!'
      return head :unauthorized
    end
  end

  def ensure_params_exist
    return unless params[:user_login].blank?
    render :json=>{:success=>false, :message=>"missing user_login parameter"}, :status=>422
  end

  def invalid_login_attempt
    render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
  end
end
