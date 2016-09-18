class Api::UserController < ApplicationController
  def index
    return head :unauthorized if current_user.nil?
    render json: { stats: AppStat.get_user_stats(current_user), usages: AppUsage.where(user_id: current_user.id) }
  end
end