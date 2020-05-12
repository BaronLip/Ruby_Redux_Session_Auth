# Ruby_Redux_Session_Auth
I'm using this resource to create a Redux sign-up and login form.

### Resources
• https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2

### Backend Process
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
12. `config/routes` file
    1.  `resources :users, only: [:index, :show, :create]`
        1.  **NOTE: May change this to allow :update and :destroy for users.**
13. Create users_controller.rb file and add Restful routes. Only index show and created needed at this point in time. See file for code.
14. Add helper methods: login!, loggged_in?, current_user, authorized_user?, logout to ApplicationController.rb. See file for code.
15. Create sessions_controller.rb file and add Restful routes. See file for code.
16. Add routes for session in routes.rb

### Frontend Process
1. Create React app with Redux and Redux Tool Kit.
   1. $ npx create-react-app ruby-redux-login-frontend --template redux
2. Remove extra files:
   1. App.css
   2. App.test.js
   3. logo.svg
   4. serviceWorker.js
   5. Removed App.css, {logo} and counter import from App.js
3. App.js file, removed all inner code.
4. Update index.html <title> and manifest.json app names.
5. Add React-Router-Dom, react-router, and Axios.
   1. $ npm install react-router-dom
   2. 
   3. $ yarn add axios
6. 




### Logic

The sessions_controller does not have "standard" Restful routes. It creates a session by setting the status of "logged_in". `is_logged_in` verifies the logged in status and returns the current_user. or "logged_out" and returns the user that is found.

user

current_user

logged_in

logged_out

status


### Questions
1. What is serviceWorker.js?
2. What does manifest.json file do?
3. What is React.Strictmode in index.html? 
4. 
