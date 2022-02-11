import User from "../auth/user.js";
import PwdToken from "./tokenModel.js";
import bcrypt from "bcryptjs";
import sendEmail from "./sendEmail.js";
import crypto from "crypto";
import path from "path";

export const requestPwdReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(422).send("Please provide an email");
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
