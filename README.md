# Ruby_Redux_Session_Auth
I'm using this resource to create a Redux sign-up and login form.

### Resources
• https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2

### Process
1. Initialize a Rails backend. 
   1. $ rails new ruby-redux-login-api --database=postgresql
   2. NOTE: Did not use the "--api" flag because session functionality needs to be kept. 
2. Check which Ruby version is loaded.
   1. $ ruby -v  (ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin18])
3. Decided to upgrade to Ruby 6.
   1. $ brew install ruby (Homebrew updated but Ruby did not.)
   2. Went through a couple suggest errors:
      1. $ brew link highlight
      2. $ brew link gettext
      3. $ brew link node (This one would not work.)
   3. $ **rvm install ruby --latest** (Use this to install latest Ruby version.)
4. Also needed to update RVM (Ruby version manager).
   1. $ rvm get stable (Seems to have worked...).
5. Add gems.
   1. #Gemfile
      1. gem 'bcrypt', '~> 3.1', '>= 3.1.12'
         1. $ gem install bcrypt
      2. gem 'rack-cors', '~> 1.1', '>= 1.1.1'
         1. $ gem install rack-cors
      3. gem 'pry', '~> 0.13.1'
         1. $ gem install pry
6. Create cors.rb file in config/initializers folder. See file for code.
   1. **NOTE: The origins address will need to change if deployed.**
7. Create session_store.rb file in config/initializers folder. See file for code.
   1. Updated key to '_ruby_redux_session_auth'. 
   2. **NOTE: The domain would need to change if deployed.
8. #config/puma - Changed default port to 3001.
9. Create User model
   1.  $ rails g model User username email password_digest
10. Create database
    1.  $ rails db:create && rails db:migrate
11. `models/user.rb` file
    1.  Add "has_secure_password"
    2.  Add validations. See file for code.
12. `config/routes` folder
    1.  `resources :users, only: [:index, :show, :create]`
        1.  **NOTE: May change this to allow :update and :destroy for users.**
13. 
    1.  
