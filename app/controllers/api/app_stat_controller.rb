class Api::AppStatController < ApplicationController
  def index
    return head :unauthorized if current_user.nil?
    render json: AppStat.get_user_stats(current_user)
  end
end