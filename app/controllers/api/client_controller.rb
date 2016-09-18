require 'jwt'

class Api::ClientController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :ensure_params_exist, :only => [:get_token]
  before_action :process_access_token, :only => [:push_data]
  respond_to :json

  def get_token
    user = User.find_for_database_authentication(email: params[:user_login][:email])

    return invalid_login_attempt unless user

    if user.valid_password?(params[:user_login][:password])
      return render json: { success: true, client_token: user.client_token }
    end
    invalid_login_attempt
  end

  def push_data
    event_array = params['_json']
    @user.events_to_db event_array
    render json: { stats: AppStat.get_user_stats(@user) }, status: 200
  end

  protected

  def process_access_token
    token = request.headers['Access-Token']
    puts "Token: #{token}"
    jwt_secret = ENV['PRODUCTION'] ? ENV['TIMIO_JWT_SECRET'] : 'fakesecret'
    begin
      decoded = JWT.decode token, jwt_secret, 'HS256'
      user_email = decoded[0]['data'].split(' ').first
      @user = User.find_by(email: user_email)
      return head :not_found if @user.nil?
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
