class SleepLog < ApplicationRecord
  # t.date :date
  # t.string :sleep_goal
  # t.float :hours_sleep
  # t.string :device_time
  validates :date, presence: true
end
