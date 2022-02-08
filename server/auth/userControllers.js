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
    token: jwt.sign({ id: uId, email: email }, process.env.TOKEN_KEY, {
      expiresIn: "7h",
    }),
  });
  await user.save();
  return res.status(200).json({ success: true, user: user });
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({
      msg: "User not found.",
      invalidEmail: true,
    });
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
      return res.status(200).json({ success: true, user: user });
    } else {
      return res.status(400).json({
        msg: "Wrong password",
        invalidPwd: true,
      });
    }
  });
};
