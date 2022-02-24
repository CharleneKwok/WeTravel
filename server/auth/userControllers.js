import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// add new user to db
export const signup = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  // encrypt password
  const encryptedPwd = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

  // send to db
  const user = await User.create({
    google: false,
    username: username,
    email: email.toLowerCase(),
    password: encryptedPwd,
    avatar: avatar,
    token: jwt.sign({ email: email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    }),
  });
  await user.save();
  return res.status(200).json({ user });
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  // used to login with google and no setup password
  if (user.google && !user.password) {
    return res.status(400).send("Please sign in with Google");
  }

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      throw new Error(err.message);
    }
    if (result) {
      user.token = jwt.sign(
        { id: user.uId, email: email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      await user.save();
      return res.status(200).json({ user });
    } else {
      return res.status(400).send("Wrong Password. Please try again.");
    }
  });
};

// logout
export const logout = async (req, res) => {
  const { id } = req.body;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.token = "";
  await user.save();
  res.status(200).send("Logout success");
};

// get user info
export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).json({ user });
};

// Google login
// middleware =>
// put it into user db as new user if it is the first time
// once use google login, then the user cannot signup with the same email
export const googleLogin = async (req, res) => {
  const { username, email, token, avatar } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    // user exists in db
    user.token = token;
    await user.save();
    return res.status(200).json({ user });
  } else {
    let name = username;
    // if username exists then add number behind the name
    const checkUsername = await User.find({
      username: { $regex: username, $options: "i" },
    });
    if (checkUsername) {
      let nums = checkUsername.map((i) => +i.username.split("_")[1]);
      nums = nums.filter((i) => i);
      const maxNum = Math.max(...nums) + 1;
      name = username + "_" + maxNum;
      console.log("🚀 ~ username", name);
    }
    const newUser = await User.create({
      email: email,
      username: name,
      token: token,
      google: true,
      avatar: avatar,
    });
    await newUser.save();
    return res.status(200).json({ user: newUser });
  }
};
