import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// add new user to db
export const signup = async (req, res) => {
  const { username, email, password, avatar, uId } = req.body;

  // encrypt password
  const encryptedPwd = await bcrypt.hash(password, 12);

  // send to db
  const user = await User.create({
    uId: uId,
    username: username,
    email: email.toLowerCase(),
    password: encryptedPwd,
    avatar: avatar,
    token: jwt.sign({ id: uId, email: email }, process.env.TOKEN_KEY, {
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

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      throw new Error(err.message);
    }
    if (result) {
      user.token = jwt.sign(
        { id: user.uId, email: email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "7h",
        }
      );
      await user.save();
      return res.status(200).json({ user });
    } else {
      return res.status(400).send("Wrong Password");
    }
  });
};

// logout
export const logout = async (req, res) => {
  const { id } = req.body;
  const user = await User.findOne({ id: id });
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.token = "";
  await user.save();
  res.status(200).send("Logout success");
};

// get user info
export const getUser = async (req, res) => {
  console.log("🚀 ~ req.params", req.params);
  const { id } = req.params;
  const user = await User.findOne({ id: +id });
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).json({ user });
};
