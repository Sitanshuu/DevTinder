# Lecture-3 (Creating Express Server)

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

- Initialize git
- Create .gitignore
- Create a remote repository on github
- Push all the code to remote origin
- Play with routes and route extension. Eg. /hello, /, /hello/2, /xyz
- Order of the routes matters a lot
- Install postman app and make a workspace/collection > make a test API Call
- Write logic to handle GET, POST, PATCH, PUT, DELETE API Calls and test them in 
  postman
- Difference between PATCH vs PUT requests
- Difference between req.params & req.query
- Explore routing and use of "?", "+", "()", "*" in the routes
- Use of REGEX in the routes
- Reading the query params in the routes
- Reading the dynamic routes


# Lecture-5 (Middlewares & Error Handlers)

- Multiple route handlers
- next() function & errors along with res.send()
- Explore app.use(<path>, rH1, rH2, [rH3, rH4, rH5])
- Read more about middleware functions, why do we need it
- How express js basically handles requests behind the scenes
- app.use() VS app.all() 
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error handling using app.use()


# Lecture-6 (Database, Schemas & Models)

- Create a free cluster on Mondb website
- Install mongoose library
- Connect your application to the database
- Call the connectDB function and connect to the database before listening to the 
  incoming requests
- Create a userSchema & user model
- Create POST /signup API to add data to the database
- Push some documents using API Calls from postman
- Handle some errors using try & catch block


# Lecture-7 (Diving Into API's)

- Difference between javascript object VS JSON
- Add express.json() middleware to your application
- User.findOne() with duplicate values in the database
- API - POST /signup - add user to the database
- API - GET /user - get user based on their emailId
- API - GET /feed - get all users from the database
- API - DELETE /user - delete user based on their _id
- API - PATCH /user - update user based on their _id
- API - PATCH /user - update user based on their emailId
- Explore the mongoose documentation for Models
- Explore options parameter in Model.findOneAndUpdate()


# Lecture-8 (Data Sanitization & Validations)

- Expolre schematypes options from the mongoose documentation
- Add required, min, max, minLength, maxLength, unique, lowercase, 
  trim
- Add default and custom validate function to the schema
- Improve the DB Schema (Put all appropriate validations on each 
  field in schema)
- Add timestamps to the schema
- Add API level validations for patch requests and signup post API
- Add API validations for each field
- Install Validator
- Explore the validator library functions and use them
- NEVER TRUST req.body (Anything malicious can be sent by the 
  users)


# Lecture-9 (Encrypting Passwords)

- Validate data in /signup API by creating the helper function or utility function
- Install bcrypt package
- Create passwordHash using bcrypt.hash() and save the user with encrypted 
  password
- Never ever disclose important information from the DB or the Server
- Dont expose extra informations from the DB or the Database
- Create login API
- Validate the data
- Compare passwords and throw errors if email or password is invalid


# Lecture-10 (Authentication, JWT & Cookies)

- Install cookie-parser
- Send a dummy cookie to user
- Create GET /profile API & check if you get the cookie back
- Install JWT 
- In login API, after email and password validation, create a jwt token and send 
  it back to user inside cookies
- Read the cookies inside the /profile API and send the user back if available & 
  logged in
- Write the userAuth middleware
- Add the userAuth middleware in profile API & create a new POST 
  /sendConnectionRequest API with userAuth middleware
- Set the expiry of JWT and Cookies to 7 days
- Create userSchema methods to create token and compare passwords in 
  /models/users.js (Refactor the code to offload to the schema helper functions)


# Lecture-11 (Diving Into APIs & Express Router)

- Read documentation for express.Router()
- Create routes folder for managing auth, profile and request routes
- Create Routers and import in app.js


# Lecture-12 (Logical DB Query & Compound Indexes)

- Create Connection Request schema
- Send connection request API with proper validation of data
- Think about all corner cases
- Comparision queries in mongoDB
- $or query and $and query in mongoDB (logical queries in mongodb)
- Read more about indexes in mongoDB
- Read about schema.pre("save", function (){}) functions
- Why do we need index in DB
- Advantages & disadvantages of creating index in mongodb
- Read more about compound indexes
- ALWAYS THINK ABOUT CORNER CASES WHILE BUILDING API'S


# Lecture-13 (ref, Populate & Thought Process Of Writting API'S)

- Thought process of POST & GET Api's
- Read about ref & populate
- Create GET /user/request/received with all the checks
- Create GET /user/connections API with all checks


# Lecture-14 (Building Feed API & Pagination)

- Think and explore for the logic of GET /user/feed
- Query operators in MongoDB ($nin, $ne, etc..)
- 