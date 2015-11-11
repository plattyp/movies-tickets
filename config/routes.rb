Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    resources :auditoria
    resources :movies
    resources :showings
    resources :orders
    get "ratings", to: "ratings#index"
    get "showings_by_day", to: "movies#showings_by_day"
  end
end