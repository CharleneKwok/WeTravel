import User from "../auth/user.js";

export const checkToken = async (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.status(400).send("Need user token");
  console.log("🚀 ~ req.body", req.body);
  console.log("🚀 ~ token", token);
  const user = await User.findOne({ token: token });
  if (!user) return res.status(404).send("User not found or token expired");
  req.body.userId = user._id;
  next();
};
