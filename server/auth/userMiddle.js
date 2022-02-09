import User from "./user.js";

export const checkSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || username.length < 1) {
    return res.status(400).send("Username cannot be empty");
  } else if (!email || !email.includes("@")) {
    return res.status(400).send("Invalid email address");
  } else if (!password || password.length < 6) {
    return res.status(400).send("Password must be longer than 5");
  }

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.status(409).send("User already exists");
  }
  await User.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((lastUser) => {
      req.body.uId = lastUser[0] ? lastUser[0].uId + 1 : 0;
    });
  next();
};
