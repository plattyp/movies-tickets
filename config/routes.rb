Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    resources :auditoria
    resources :movies
    resources :showings
    get "ratings", to: "ratings#index"
  end
end