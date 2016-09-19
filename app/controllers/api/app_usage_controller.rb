class Api::AppUsageController < ApplicationController
  before_action :authenticate_user!

  def index
    return head :unauthorized if current_user.nil?
    render json: AppUsage.get_user_usages(current_user)
  end
end