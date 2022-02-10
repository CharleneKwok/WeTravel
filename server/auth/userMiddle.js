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
  await User.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((lastUser) => {
      req.body.uId = lastUser[0] ? lastUser[0].uId + 1 : 0;
    });
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
  if (!oldUser) {
    await User.find({})
      .sort({ _id: -1 })
      .limit(1)
      .then((lastUser) => {
        req.body.uId = lastUser[0] ? lastUser[0].uId + 1 : 0;
      });
  } else {
    req.body.uId = oldUser.uId;
    req.body.avatar = oldUser.avatar;
    req.body.username = oldUser.username;
  }
  next();
};
