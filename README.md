# Ruby_Redux_Session_Auth

## Summary
This repo is a practice in:
1. Implementing session sign-up and login.
2. Applying React patterns of state and props.
3. Converting a React app to a Redux app.

The initial React code is supplied by the [blog post](https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2). Walking through that code is a great first step in understanding the combination of session auth and React. The larger portion of my focus is practicing the conversion to Redux.

Knowing React will work without Redux conventions, This app started with the Redux toolkit template to help avoid conversion troubles later. 

Before converting into a Redux app, additional functionality such as logging out and redirects were added on to the [blog post](https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2) code.


---
## Resources:
There was an ample amount of web searches and [stackoverflow](stackoverflow.com) hints/recommendations. My experience is the docs helped the most to clarify what was needed. However, I also discovered the combinations of React resources could lead to different solutions and at my current level of knowledge, can be confusing. I recommend to continue practicing to better understand the functionality and gain knowledge. 
1. https://medium.com/how-i-get-it/react-with-rails-user-authentication-8977e98762f2
2. https://reactjs.org/
3. https://react-redux.js.org/
4. https://redux-toolkit.js.org/
5. https://reacttraining.com/react-router/web/guides/quick-start


---
## Versions:
• ruby 2.6.1p33 (2019-01-30 revision 66950)
• react 16.13.1
• redux 4.0.5
• axios 0.19.2 


---
## Backend Process:
1. Initialize a Rails backend. 
   1. $ rails new ruby-redux-login-api --database=postgresql
   2. NOTE: Did not use the "--api" flag because session functionality needs to be kept. 
2. Check which Ruby version is loaded.
   1. $ ruby -v  (ruby 2.6.1p33 (2019-01-30 revision 66950) [x86_64-darwin18])
3. Decided to upgrade to Ruby 6.
   1. $ brew install ruby (Homebrew updated but Ruby did not.)
4. Went through a couple suggested errors:
   1. $ brew link highlight
   2. $ brew link gettext
   3. $ brew link node (This one would not work.)
5. $ **rvm install ruby --latest** (Use this to install latest Ruby version.)
6. Also needed to update RVM (Ruby version manager).
   1. $ rvm get stable (Seems to have worked...).
7. Add gems.
   1.  #Gemfile
        1. gem 'bcrypt', '~> 3.1', '>= 3.1.12'
           1. $ gem install bcrypt
        2. gem 'rack-cors', '~> 1.1', '>= 1.1.1'
           1. $ gem install rack-cors
        3.  gem 'pry', '~> 0.13.1'
            1. $ gem install pry
8.  Create `cors.rb` file in config/initializers folder. See file for code.
    1.  **NOTE: The origins address will need to change if deployed.**
9.  Create session_store.rb file in config/initializers folder. See file for code.
10. Updated key to '_ruby_redux_session_auth'. 
    1.  **NOTE: The domain would need to change if deployed.**
11. `config/puma.rb` - Changed default port to 3001.
12. Create User model
13. $ rails g model User username email password_digest
14. Create database
	1.  $ rails db:create && rails db:migrate
15. `models/user.rb` file
	2.  Add "has_secure_password"
	3.  Add validations. See file for code.
16. `config/routes` file
	4.  `resources :users, only: [:index, :show, :create]`
		1.  **NOTE: May change this to allow :update and :destroy for users.**
17. Create users_controller.rb file and add Restful routes. Only index show and created needed at this point in time. See file for code.
18. Add helper methods: login!, loggged_in?, current_user, authorized_user?, logout to ApplicationController.rb. See file for code.
19. Create sessions_controller.rb file and add Restful routes. See file for code.
20. Add routes for session in routes.rb

---
## Frontend Process
### React section - TLDR - The below is not necessary to read but is a collection of steps as I followed along with the blog post to create the React functionality. 
1. Create React app with Redux and Redux Tool Kit.
   1. $ npx create-react-app ruby-redux-login-frontend --template redux
2. Remove extra files:
   1. App.css
   2. App.test.js
   3. logo.svg
   4. serviceWorker.js
3. Remove App.css, {logo} and counter import from App.js
4. Within store.js file
	1. Remove import counterReducer, templated reducer.
5. Within index.js file
	1. Remove import for serviceWorker.
	2. Remove "serviceWorker.unregister();" from index.js
6.  App.js file, removed all inner code.
7.  Update index.html title and manifest.json app names.
8.  Add React-Router-Dom, react-router, and Axios.
    1.  $ npm install -S react-router-dom (Make sure to include "-S".)
	2. The blog states to install react-router separately but cs show react-router-dom to encompass react-router for web application.
9.  $ npm install axios --save (Make sure to include "--save".)
10. Convert App.js to be a class component in order for it to have local state.
11. Add `handleLogin()`, `handleLogout()`, `loginStatus()`, and `isLoggedIn` to App component.
12. Add `componentDidMount()` lifecycle method to App component.
13. Create Components Folder.
14. Create Home.js component using code from blog.
15. Import Home component into App.js.
16. Add Home component to Route equal to "./".
17. Create Login.js component using code from blog.
18. Import Login component into App.js.
19. Add Login component to Route equal to "./login".
20. Create Signup.js component usig code from blog.
21. Import Signup component into App.js.
22. Add Signup component to Route equal to "./signup".\

**END BLOG POST CODE**

23. Added Success component and changed redirect, after signup or login to it.
24. Added Login link to Signup.js when handleErrors() is called.
25. Added logout link to Success page.
26. Removed redirect() function from Signup and Login components.
    1. Adjusted code to push into `props.history` and redirect to Success component.
27. Added user object as a props to the Success component.
28. Added logout link and method to Success component.
29. Created three "paths" to sign in: the included code, immediate Success, and requiring Login after Signup. See comments in Signup.js.\

---
## REDUX CONVERSION

### Redux section - The below is not necessary to read but is a collection of steps as I followed along with the blog post to create the Redux functionality.
1. Created "Redux" Branch.
2. Create Sessions and Users, reducers and actions folders.
3. Import usersReducer to store.js and add to reducer object. 
4. Connect usersReducer to Signup component.
5. Repeat steps with SessionsReducer.
6. Create Actions folder.
7. Create userActions file.
8. Copied over signup function to userActions.
9. Added mapDispatchToProps into Signup.js.
10. Add mapDispatchToProps to connect() statement in Signup.js.
11. Adjusted handleSubmit() to utilize signup dispatch.
12. In process of determining how to utilize helper methods from App.js and figuring out how to redirect in action file.
    1.  Installed "history" library.
        1.  npm install --save history
    2.  imported {createBrowserHistory} from 'history'
    3.  utilized pushing into browserHistory for reDirect.
13. Updated mapDispatchToProps() to dispatch and allow for userInfo parameter.
14. Getting an async error. Searches recommend installing redux-thunk.
    1.  $ npm install --save redux-thunk
    2.  store.js - import thunk from 'redux-thunk';
    3.  Turns out that thunk is included in ReduxToolKit, just needed to specify to add it within configure store.
15. ~~After much more googling, I believe the latest solution would be "connected-react-router". https://github.com/supasate/connected-react-router.~~
16. After reading more on redux.js, <Router> needs to be wrapped in <Provider> when using Redux.

---
## MOST DEFINITELY TL;DR - Below are personal notes while I made progress.

## Questions:
1. What is serviceWorker.js? _Service worker allows for offline capabilities that this app is not digging into._
2. What does manifest.json file do? _This file tells the browser about your website. It is required by Chrome. It actually spells it out in the index.html file._
3. What is React.Strictmode in index.js? _https://reactjs.org/docs/strict-mode.html_

4. Double back to understand and create a Higher Order Component to make Signup and Login forms more DRY.
5. How does `redirect` syntax work? _Ended up pushing into props.history. With react-router, every immediate child component of react-router will receive the prop of "history"._
6. From App component, should I change loggedInStatus prop to be isLoggedIn to match property? _This is just preference._
7. When using render props, is the render method the same render method as React's render method? _No, the render is just like any property that would be passed._
8. Signup.js line 41. How does the User get passed from one component to the next? Or, Why isn't the User being passed from Signup to Login. Maybe even Login to Home?
   * Seems like there are a number ways to redirect with React: https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
     1. Using `Redirect` imported from react-router-dom.
     2. `useHistory` hook.
     3. `props.history` combined with `withRouter`.
     4. `this.props.history.push( route, object)` _This is the option used._
9.  What happened to "this" when making a function call? _Make sure `.bind(this)` for each function, in the constructor of the component._
10. What are the determining factors of creating state from React to Redux? For this app, I'm mapping the output of the reducers to the output backend controllers. Since there is a sessions and user controller, there will be a sessions and users reducers.
11. Does react-router-dom not have "history" built in? Why is "connected-react-router" necessary for history in Redux?
_In the process of just using react-router-dom only. Based on "https://reacttraining.com/react-router/web/guides/redux-integration", need to also utilize withRouter for each component connected to Redux._
12. Is it necessary to use Thunk or is ES7 Async/Await the same result? _Although not tested here, I believe they can achieve the same results._

---
## Things I learned/practiced
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
* "Container" refers to a component that is connected to the Redux Store, a stateful component.
* With Redux, <Router> needs to be wrapped in <Provider> in order for the application to have the proper routing.
* THUNK...this is still going to take some practice. Callbacks upon callbacks.
* Dispatching to the store before redirecting creates an accurate state.
