# REST API with MongoDB - ConsultAdd MEAN/MERN Training
### This API has three modules - User, Posts and Auth
#### Note: Server runs locally on port 3000.

### Env file contents:  
DATABASE_URL: URL to connect with MongoDB database.  
USER_JWT_SECRET: Secret for JWT.  
GOOGLE_CLIENT_ID: Client ID for Google OAuth.  
GOOGLE_CLIENT_SECRET: Client secret for Google OAuth.  

## Posts
Implemented CRUD operations for a Post. A single post contains a title and a body.
#### Endpoint: /api/posts

### Routes

#### 1). Create 
Endpoint: /post  
Method: POST  
Body: JSON -> { title: "test title", body: "test body" }  
Validations: Both must be string; title is required.  
Returns: Object containing code, status and created post.

#### 2). Read 
Endpoint: /  
Method: GET  
Returns: Object containing code, status and array of post.

#### 3). Update 
Endpoint: /:postId (postId should be value from the "_id" field)  
Method: PUT  
Body: JSON -> { title: "test title", body: "test body" }  
Validations: Both must be string; postId must match the following RegExp: /^[0-9a-fA-F]{24}$/
Returns: Object containing code, status and created post.

#### 4). Delete 
Endpoint: /:postId (postId should be value from the "_id" field)  
Method: DELETE  
Validations: postId must match the following RegExp: /^[0-9a-fA-F]{24}$/. 
Returns: Object containing code, status and message.

## Auth
Implemented JWT and Google OAuth 2.0. Session is also maintained using SQLite.
#### Endpoint: /api/auth

### Routes

#### 1). Login 
Endpoint: /login  
Method: POST  
Body: JSON -> { email: "test@test.com", password: "password" }  
Validations: Both must be string and required; password should match the following RegExp: /^[a-zA-Z0-9]{6,30}$/.  
Returns: Object containing code, status and access token.

#### 2). Register 
Endpoint: /register  
Method: POST  
Body: JSON -> { email: "test@test.com", password: "password", name: "John Doe", role: "admin" }  
Validations: All fields must be string and required, except for role, which is optional; password should match the following RegExp: /^[a-zA-Z0-9]{6,30}$/. Name length minimum 2 and maximum 30.   
Returns: Object containing code, status, created user and access token.

#### 3). Login with google 
Endpoint: /login/federated/google
Method: GET  
Returns: Redirects to /api/auth on success otherwise to /login (/login route is not defined).

### 4). Logout of google oauth  
Endpoint: /logout  
Method: GET  
Returns: Redirects to /api/testsession

#### To test session  
go to the following url: /api/testsession  
Method: GET  
Returns: Object containing user details.

#### To test jwt protected route  
go to the following url: /api/testprotected  
Method: GET  
Returns: Message saying "this is a protected route".

## Users
Get all users and delete users implemented. A single user contains a name, email, password and a role.
Endpoint: /api/user

### Routes

#### 1). Get All Users 
Endpoint: /  
Method: GET  
Returns: Object containing code, status and array of users.

#### 2). Delete 
Endpoint: /:id
Method: DELETE  
Returns: Object containing code, status and message.
