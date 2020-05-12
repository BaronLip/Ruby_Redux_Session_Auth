if Rails.env === 'production' 
	Rails.application.config.session_store :cookie_store, key: '_ruby_redux_session_auth', domain: 'your-frontend-domain'
else
	Rails.application.config.session_store :cookie_store, key: '_ruby_redux_session_auth' 
end