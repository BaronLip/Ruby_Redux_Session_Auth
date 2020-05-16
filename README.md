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
6. #Gemfile
	1. gem 'bcrypt', '~> 3.1', '>= 3.1.12'
		1. $ gem install bcrypt
	2. gem 'rack-cors', '~> 1.1', '>= 1.1.1'
		1. $ gem install rack-cors
	3. gem 'pry', '~> 0.13.1'
		1. $ gem install pry
7.  Create cors.rb file in config/initializers folder. See file for code.
8.  **NOTE: The origins address will need to change if deployed.**
9.  Create session_store.rb file in config/initializers folder. See file for code.
10. Updated key to '_ruby_redux_session_auth'. 
11. **NOTE: The domain would need to change if deployed.
12. #config/puma - Changed default port to 3001.
13. Create User model
14. $ rails g model User username email password_digest
15. Create database
	1.  $ rails db:create && rails db:migrate
16. `models/user.rb` file
	1.  Add "has_secure_password"
	2.  Add validations. See file for code.
17. `config/routes` file
	1.  `resources :users, only: [:index, :show, :create]`
		1.  **NOTE: May change this to allow :update and :destroy for users.**
18. Create users_controller.rb file and add Restful routes. Only index show and created needed at this point in time. See file for code.
19. Add helper methods: login!, loggged_in?, current_user, authorized_user?, logout to ApplicationController.rb. See file for code.
20. Create sessions_controller.rb file and add Restful routes. See file for code.
21. Add routes for session in routes.rb

### Frontend Process
1. Create React app with Redux and Redux Tool Kit.
   1. $ npx create-react-app ruby-redux-login-frontend --template redux
2. Remove extra files:
   1. App.css
   2. App.test.js
   3. logo.svg
3. serviceWorker.js
4. Remove App.css, {logo} and counter import from App.js
5. Within store.js file
	1. Remove import counterReducer.
6. Within index.js file
	1. Remove import for serviceWorker.
	2. Remove "serviceWorker.unregister();" from index.js
7.  App.js file, removed all inner code.
8.  Update index.html <title> and manifest.json app names.
9.  Add React-Router-Dom, react-router, and Axios.
10. $ npm install -S react-router-dom (Make sure to include "-S".)
	1. The blog states to install react-router separately but docs show react-router-dom to encompass react-router for web application.
11. $ npm install axios --save (Make sure to include "--save".)
12. Convert App.js to be a class component in order for it to have local state.
13. Add `handleLogin()`, `handleLogout()`, `loginStatus()`, and `isLoggedIn` to App component.
14. Add `componentDidMount()` lifecycle method to App component.
15. Create Components Folder.
16. Create Home.js component using code from blog.
17.  Import Home component into App.js.
18. Add Home component to <Route> equal to "./".
19. Create Login.js component using code from blog.
20. Import Login component into App.js.
21. Add Login component to <Route> equal to "./login".
22. Create Signup.js component usig code from blog.
23. Import Signup component into App.js.
24. Add Signup component to <Route> equal to "./signup".
	**END BLOG POST CODE**
17. Added Success component and changed redirect, after signup or login to it.
18. Added Login link to Signup.js when handleErrors() is called.
19. Added logout link to Success page.
20. Removed redirect() function from Signup and Login components.
21. Adjusted code to push into `props.history` and redirect to Success component.
22. Added user object as a props to the Success component.
23. Added logout link and method to Success component.
24. Created three "paths" to sign in: the included code, immediate Success, and requiring Login after Signup. See comments in Signup.js.
25. Created "Redux" Branch.
26. Create Sessions and Users, reducers and actions folders.
27. Import usersReducer to store.js and add to reducer object. 
28. Connect the 



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
5. How does `redirect` syntax work? _Ended up pushing into props.history. With react-router, every immediate child component of react-router will receive the prop of "history"._
6. From App component, should I change loggedInStatus prop to be isLoggedIn to match property? _This is just preference._
7. When using render props, is the render method the same render method as React's render method? _No, the render is just like any property that would be passed._
8. ~~*Signup.js line 41. How does the User get passed from one component to the next? Or, Why isn't the User being passed from Signup to Login. Maybe even Login to Home?~~
   * Seems like there are a number ways to redirect with React: https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
     1. Using `Redirect` imported from react-router-dom.
     2. `useHistory` hook.
     3. `props.history` combined with `withRouter`.
     4. `this.props.history.push( route, object)` _This is the option used._
9. What happened to "this" when making a function call? _Make sure `.bind(this)` for each function, in the constructor of the component._
10. What are the determining factors of creating state from React to Redux? For this app, I'm basing the reducers by the backend controllers. Since there is a sessions and user controller, there will be a sessions and users reducers.


### Things I learned/practiced
* Creating new branches in Git.
* When using render={ props => ()}, render is a prop with a value of a function using the props as a parameter. It returns a component with all the props of the parent component.
* Learning how to redirect while maintaining state NOW...
  * Components that are an immediate child of the <Route> component receives 'history' as a prop.
  * When pushing into `this.props.history` the first parameter is the route path. The optional second parameter can be any object. In this case it is the user object. 
    * The receiving component receives the object as under `props.location.state.objectName`.
    * Use the constructor of the component to set state as the component renders.
* Binding "this" to a function call for React.
* `componentWillMount()` is depreciated. Surprised it was being used but could see why.
* Converting React app to Redux conventions.
* Making an action_types file prevents the requirement of having to change the "string" everywhere in the app. Just look it up in the action_types file and update. (I still find this a bit odd cause since the actionName and the string are the same. If one is changed, it would no longer match and could sacrifice readability.)
* "Container" refers to a component that is connected to the Redux Store.

