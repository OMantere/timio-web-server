class Api::AppUsageController < DeviseController
  skip_before_action :verify_authenticity_token

  def index
    render json: AppUsage.where(user_id: current_user.id)
  end
end