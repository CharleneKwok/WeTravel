# Auth

## /user

### post `/user/signup`

- `status = 400` Bad Request
  Username cannot be empty/Invalid email address/Password cannot be empty
- `status = 409` Conflict
  Email already exists

### post `/user/login`

- `status = 404` Not Found
  User not found
- `status = 400`
  Please sign in with Google/Wrong Password. Please try again.

### post `/user/google/login`

### post `/user/logout`

- `status = 404` Not Found
  User not found

### get `/user/:username` (get user info)

- `status = 404` Not Found
  User not found

### put `/user/settings/username`

- header token
- body : username

### put `/user/settings/avatar`

- body : avatar

### put `/user/settings/bio`

- body : bio

### put `/user/settings/map`

- body : mapAppearance

### put `/user/settings/whole`

- body : wholeAppearance

### put `/user/follow`

- body: followName

### put `/user/unfollow`

- body: unfollowName

## /pwdReset

### post `/`

const { token, id, password } = req.body;

- `status = 404` Not Found
  Link was expired. Please request password reset again.

- `status = 400`
  Unauthorized or no password provided

- `status = 401` Unauthorized
  Unauthorized to reset the password. Please try to request password reset again.

### post `/sendmail`

const { email } = req.body;

- `status = 404` Not Found
  User not found

- `status = 400`
  Please provide an email

- `status = 500` system error
  send email failed

## /saveList

### /saveList/

- get

  - body: {token}

- post
  - body: {token, location_id, name, address, tripAdvisor, image}

### /saveList/:location_id

- delete
  - body: {token}
