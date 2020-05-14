Rails.application.routes.draw do
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

	resources :users, only: [:index, :show, :create]

	post '/login', to: 'sessions#create'
	get '/logged_in', to: 'sessions#is_logged_in?'
	delete '/logout', to: 'sessions#destroy'

end
