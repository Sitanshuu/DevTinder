# DevTinder API's
# ----------------

- POST /signup (Signs up a new user to devtinder)
- POST /login (Login a registered user to devtinder)
- POST /logout (Logout a regestered and logged in user from devtinder)

- GET /profile/view (Get profile of a logged in user)
- POST /profile/edit (Update profile of a logged in user)
- POST /profile/password (Update password of a logged in user)

- POST /request/review/accepted/:userId ()
- POST /request/review/rejected/:userId ()

- GET /connections (Get all connections of a logged in user)
- GET /requests/received (Get all requests received to a logged in user)
- GET /feed (Gets the profiles of other users in the platform)