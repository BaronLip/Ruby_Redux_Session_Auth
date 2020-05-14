# Ruby_Redux_Session_Auth
This repo is a practice in:
1. Implementing session sign-up and login.
2. Applying React patterns of state and props.
3. Converting a React app to a Redux app.

The initial React code is supplied by the blog post, link in Resources. Walking through that code is a great first step in understanding the combination of session auth and React. The larger portion of my focus is practicing the conversion to Redux.

Knowing React will work without Redux conventions, I started this app with Redux template to save conversion issues later. 

Before converting into a Redux app, additional functionality such as logging out and redirects were added. This is in the works now...

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
   2. Went through a couple suggested errors:
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
   5. Remove App.css, {logo} and counter import from App.js
   6. Within store.js file
      1. Remove import counterReducer.
   7. Within index.js file
      1. Remove import for serviceWorker.
      2. Remove "serviceWorker.unregister();" from index.js
3. App.js file, removed all inner code.
4. Update index.html <title> and manifest.json app names.
5. Add React-Router-Dom, react-router, and Axios.
   1. $ npm install -S react-router-dom (Make sure to include "-S".)
      1. The blog states to install react-router separately but docs show react-router-dom to encompass react-router for web application.
   2. $ npm install axios --save (Make sure to include "--save".)
6. Convert App.js to be a class component in order for it to have local state.
   1. Add `handleLogin()`, `handleLogout()`, `loginStatus()`, and `isLoggedIn` to App component.
   2. Add `componentDidMount()` lifecycle method to App component.
7. Create Components Folder.
   **
8. Create Home.js component using code from blog.
9.  Import Home component into App.js.
10. Add Home component to <Route> equal to "./".
11. Create Login.js component using code from blog.
12. Import Login component into App.js.
13. Add Login component to <Route> equal to "./login".
14. Create Signup.js component usig code from blog.
15. Import Signup component into App.js.
16. Add Signup component to <Route> equal to "./signup".
    **END BLOG POST CODE**
17. Added Success component and changed redirect, after signup or login to it.
18.    




### Logic

The sessions_controller does not have "standard" Restful routes. It creates a session by setting the status of "logged_in". `is_logged_in` verifies the logged in status and returns the current_user. or "logged_out" and returns the user that is found.

App.js serves as a router to render all other components to the DOM. It will not render itself. 

It will manage authentication state locally...

user

current_user

logged_in

logged_out

status


### Questions
1. What is serviceWorker.js?
2. What does manifest.json file do?
3. What is React.Strictmode in index.html? 
4. Double back to understand and create a Higher Order Component to make Signup and Login forms more DRY.
5. How does `redirect` syntax work?
6. From App component, should I change loggedInStatus prop to be isLoggedIn to match property?
7. After Signing up or Logging in, Redirect to a success page instead.
8. Add a little navigation...
9. Add a logout button to Success component.

### Things I learned/practiced
* Creating new branches in Git.
* 
