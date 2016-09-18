class Api::AppStatController < DeviseController
  skip_before_action :verify_authenticity_token

  def index
    render json: AppStat.where(user_id: current_user.id)
  end
end