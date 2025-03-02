class SleepLogsChannel < ApplicationCable::Channel
  def subscribed
    # By convention, you can pick any name
    stream_from "sleep_logs_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
