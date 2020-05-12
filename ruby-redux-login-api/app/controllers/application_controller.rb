class ApplicationController < ActionController::Base
	skip_before_action :verify_authenticity_token
	
	helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
	
	# Login sets the session[:user_id] to be the @user_id.
	def login!
		session[:user_id] = @user.id
	end
	
	# Logged_in is when session[:user_id] is true.
	def logged_in?
		!!session[:user_id]
	end
	
	# Current User is the user with the current session_id set to as the user's id.
	# Logged in is when session[user_id] and @user_id match. 
	def current_user
		@current_user ||= User.find(session[:user_id]) if session[:user_id]
	end
	
	def authorized_user?
		@user == current_user
	end
	
	def logout!
		session.clear
	end
end
