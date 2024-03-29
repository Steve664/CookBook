Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  resources :users, param: :name
  resources :recipes do
    resources :reviews, only: [:create]
  end
  resources :reviews, only: [:index, :edit, :update, :destroy]
  resources :allergens
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get '/recipes/:id/review', to: "recipes#recipe_reviews"
get '/auth/verify_token', to: 'authentication#verify_token'
  post '/auth/login', to: 'authentication#login'
 
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
