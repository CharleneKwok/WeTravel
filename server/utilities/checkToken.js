import User from "../auth/user.js";
import jwt from "jsonwebtoken";

// password reset token
export const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).send("Need user token");
  const user = await User.findOne({ token: authorization });
  if (!user) return res.status(404).send("User not found or token expired");
  req.body.loginId = user._id;
  next();
};

// check auth token
export const checkUserToken = async (rep, res, next) => {
  const { authorization } = rep.headers;
  const user = await User.findOne({ token: authorization });
  if (!user) {
    return res.status(404).send("Wrong token. User not found");
  }
  const decoded = jwt.decode(authorization);
  const curr = new Date().getTime();
  if (decoded.exp * 1000 < curr) {
    return res.status(401).send("Token expired");
  }
  rep.body.user = user;
  next();
};
