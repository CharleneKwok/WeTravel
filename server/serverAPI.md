# Auth

## /user

### post `/signup`

- `status = 400` Bad Request
  Username cannot be empty/Invalid email address/Password cannot be empty
- `status = 409` Conflict
  Email already exists

### post `/login`

- `status = 404` Not Found
  User not found
- `status = 400`
  Please sign in with Google/Wrong Password. Please try again.

### post `/google/login`

### post `/logout`

- `status = 404` Not Found
  User not found

### get `/:id` (get user info)

- `status = 404` Not Found
  User not found

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
