# Lecture-3 (Creating Express Server)
# ------------------------------------

- Create a repository
- Initialize the repository
- Read about node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to a port
- Write request handlers for /test, /hello
- Install nodemon and update script inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret(^) and tilde(~)


# Lecture-4 (Routing & Request Handlers)
# ---------------------------------------

- Initialize git
- Create .gitignore
- Create a remote repository on github
- Push all the code to remote origin
- Play with routes and route extension. Eg. /hello, /, /hello/2, /xyz
- Order of the routes matters a lot
- Install postman app and make a workspace/collection > make a test API Call
- Write logic to handle GET, POST, PATCH, PUT, DELETE API Calls and test them in postman
- Difference between req.params & req.query
- Explore routing and use of "?", "+", "()", "*" in the routes
- Use of REGEX in the routes
- Reading the query params in the routes
- Reading the dynamic routes


# Lecture-5 (Middlewares & Error Handlers)
# -----------------------------------------

- Multiple route handlers
- next() function & errors along with res.send()
- Explore app.use(<path>, rH1, rH2, [rH3, rH4, rH5])
- Read more about middleware functions, why do we need it
- How express js basically handles requests behind the scenes
- app.use() VS app.all() 
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error handling using app.use()