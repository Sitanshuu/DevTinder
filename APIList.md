# DevTinder API's

## authRouter =>
- POST /signup (Signs up a new user to devtinder)   ==> (Done)
- POST /login (Login a registered user to devtinder)   ==> (Done)
- POST /logout (Logout a regestered and logged in user from devtinder)   ==> (Done)

## profileRouter =>
- GET /profile/view (Get profile of a logged in user)   ==> (Done)
- POST /profile/edit (Update profile of a logged in user)   ==> (Done)
- POST /profile/password (Update password of a logged in user)   ==> (Done)

## connectionRequestRouter =>
- (SENDER'S END)
- POST /request/send/:status/:userId (Send connection request)    => (Done)

- (RECEIVER'S END)
- POST /request/review/:status/:requestId (Review connection request)    => (Done)

## userRouter =>
- GET /user/requests (Get all the pending connection requests of a loggedin   
  user)    => (Done)
- GET /user/connections (Get all connections of a logged in user)    => (Done)
- GET /user/feed (Gets the profiles of other users in the platform)