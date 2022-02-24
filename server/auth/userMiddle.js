import User from "./user.js";

export const checkSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || username.length < 1) {
    return res.status(400).send("Username cannot be empty");
  } else if (!email || !email.includes("@")) {
    return res.status(400).send("Invalid email address");
  } else if (!password) {
    return res.status(400).send("Password cannot be empty");
  }

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.status(409).send("Email already exists");
  }

  const checkUsername = await User.findOne({ username: username });

  if (checkUsername) {
    return res.status(409).send("Username already exists");
  }

  next();
};

// check if email exists on db
export const checkGoogle = async (req, res, next) => {
  const oldUser = await User.findOne({ email: req.body.email });
  // if user signed up with this email before
  // connect this account with google account
  if (oldUser && !oldUser.google) {
    oldUser.google = true;
    await oldUser.save();
  }
  // put user into the db
  if (oldUser) {
    req.body.avatar = oldUser.avatar;
    req.body.username = oldUser.username;
  }
  next();
};
