class ApiController < DeviseController
  prepend_before_filter :require_no_authentication, :only => [:create ]
  skip_before_filter :verify_authenticity_token
  before_filter :ensure_params_exist
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
    puts params[:data]
  end

  protected

  def ensure_params_exist
    return unless params[:user_login].blank?
    render :json=>{:success=>false, :message=>"missing user_login parameter"}, :status=>422
  end

  def invalid_login_attempt
    render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
  end
end
