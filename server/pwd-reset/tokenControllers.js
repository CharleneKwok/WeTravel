import User from "../auth/user.js";
import PwdToken from "./tokenModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "./sendEmail.js";
import crypto from "crypto";

// send email
export const requestPwdReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Please provide an email");
  // get user info
  const user = await User.findOne({ email: email });
  if (!user) return res.status(404).send("User not found");
  // check if token db have token already
  // if there has one, then delete it cuz every token have expired time
  // reset it again
  const token = await PwdToken.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  // create a new random token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashToken = await bcrypt.hash(resetToken, +process.env.BCRYPT_SALT);

  const pwdToken = await PwdToken.create({
    token: hashToken,
    userId: user._id,
  });
  await pwdToken.save();
  // sendEmail
  sendEmail(
    email,
    {
      name: user.username,
      link: `${process.env.WEB_URL}/pwdReset?token=${hashToken}&id=${user._id}`,
    },
    res
  );
};

export const resetPwd = async (req, res) => {
  const { token, id, password } = req.body;
  const userToken = await PwdToken.findOne({ userId: id });
  // if not found
  if (!userToken) {
    return res
      .status(404)
      .send("Link was expired. Please request password reset again.");
  }

  if (!token || !id || !password) {
    return res.status(400).send("Unauthorized or no password provided");
  }

  bcrypt.compare(token, userToken.token, async (err, result) => {
    if (err) {
      throw new Error(err.message);
    }
    if (result) {
      const user = await User.findOne({ _id: id });
      const newPwd = await bcrypt.hash(password, process.env.BCRYPT_SALT);
      user.password = newPwd;
      await user.save();
      console.log(user);
      return res.status(200).send("Password was reset");
    } else {
      // not match
      return res
        .status(401)
        .send(
          "Unauthorized to reset the password. Please try to request password reset again."
        );
    }
  });
};
