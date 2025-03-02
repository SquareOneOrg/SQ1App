Rails.application.routes.draw do
  resources :sleep_logs, only: [:index, :show, :create, :update]
end
