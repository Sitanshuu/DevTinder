# DevTinder API's

## authRouter =>
- POST /signup (Signs up a new user to devtinder)
- POST /login (Login a registered user to devtinder)
- POST /logout (Logout a regestered and logged in user from devtinder)

## profileRouter =>
- GET /profile/view (Get profile of a logged in user)
- POST /profile/edit (Update profile of a logged in user)
- POST /profile/password (Update password of a logged in user)

## connectionRequestRouter =>
- POST /request/review/accepted/:userId ()
- POST /request/review/rejected/:userId ()

## userRouter =>
- GET /user/connections (Get all connections of a logged in user)
- GET /user/requests (Get all requests received to a logged in user)
- GET /user/feed (Gets the profiles of other users in the platform)