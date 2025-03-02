class SleepLogsController < ApplicationController
  def index
    # Return all logs (could filter by user if you have authentication)
    render json: SleepLog.all
  end

  def show
    log = SleepLog.find(params[:id])
    render json: log
  end

  def create
    log = SleepLog.new(sleep_log_params)
    if log.save
      render json: log, status: :created
    else
      render json: { errors: log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    log = SleepLog.find(params[:id])
    if log.update(sleep_log_params)
      render json: log
    else
      render json: { errors: log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sleep_log_params
    params.require(:sleep_log).permit(:date, :sleep_goal, :hours_sleep, :device_time)
  end
end
