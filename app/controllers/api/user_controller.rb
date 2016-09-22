class Api::UserController < ApplicationController
  before_action :authenticate_user!

  def index
    return head :unauthorized if current_user.nil?
    render json: { stats: AppStat.get_user_stats(current_user),
                   usages: AppUsage.get_user_usages(current_user),
                   user: current_user.serialize
    }
  end
end