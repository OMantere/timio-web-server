class Api::AppUsageController < ApplicationController
  def index
    return head :unauthorized if current_user.nil?
    render json: AppUsage.where(user_id: current_user.id)
  end
end