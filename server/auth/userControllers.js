import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// add new user to db
export const signup = async (req, res) => {
  const { username, email, password, uId } = req.body;

  // encrypt password
  const encryptedPwd = await bcrypt.hash(password, 12);

  // send to db
  const user = await User.create({
    uId: uId,
    username: username,
    email: email.toLowerCase(),
    password: encryptedPwd,
    token: jwt.sign({ id: uId, email: user.email }, process.env.TOKEN_KEY, {
      expiresIn: "7h",
    }),
  });
  await user.save();
  console.log(user);
  return res.status(200).json({ success: true, user: user });
};
