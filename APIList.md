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
- POST /request/send/:status/:userId (Send connection request)    => (Done)

- POST /request/review/accepted/:userId ()
- POST /request/review/rejected/:userId ()

## userRouter =>
- GET /user/connections (Get all connections of a logged in user)
- GET /user/requests (Get all requests received to a logged in user)
- GET /user/feed (Gets the profiles of other users in the platform)