import User from "../auth/user.js";

export const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(400).send("Need user token");
  const user = await User.findOne({ token: authorization });
  if (!user) return res.status(404).send("User not found or token expired");
  req.body.userId = user._id;
  next();
};
