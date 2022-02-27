import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getInfo = (user) => ({
  bio: user.bio,
  username: user.username,
  _id: user._id,
  avatar: user.avatar,
  email: user.email,
  following: user.following.length,
  followers: user.followers.length,
  token: user.token,
});

// add new user to db
export const signup = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  // encrypt password
  const encryptedPwd = await bcrypt.hash(password, +process.env.BCRYPT_SALT);

  // send to db
  const user = await User.create({
    avatar: avatar,
    token: jwt.sign({ email: email.toLowerCase() }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    }),
    google: false,
    username: username,
    email: email.toLowerCase(),
    password: encryptedPwd,
  });
  await user.save();
  return res.status(200).json({
    ...getInfo(user),
    wholeAppearance: user.wholeAppearance,
    mapAppearance: user.mapAppearance,
    google: user.google,
  });
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
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
        { email: email.toLowerCase() },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      await user.save();
      return res.status(200).json({
        wholeAppearance: user.wholeAppearance,
        mapAppearance: user.mapAppearance,
        google: user.google,
        ...getInfo(user),
      });
    } else {
      return res.status(400).send("Wrong Password. Please try again.");
    }
  });
};

// logout
export const logout = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  user.token = "";
  await user.save();
  res.status(200).send("Logout success");
};

// get user info
export const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.status(200).json({
    ...getInfo(user),
  });
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
    return res.status(200).json({ ...getInfo(user), google: user.google });
  } else {
    let name = username;
    // if username exists then add number behind the name
    const checkUsername = await User.find({
      username: { $regex: username, $options: "i" },
    });
    if (checkUsername.length > 0) {
      let nums = checkUsername.map((i) => +i.username.split("_")[1]);
      nums = nums.filter((i) => i);
      if (nums.length === 0) {
        nums.push(0);
      }
      const maxNum = Math.max(...nums) + 1;
      name = username + "_" + maxNum;
    }
    const newUser = await User.create({
      email: email,
      username: name,
      token: token,
      google: true,
      avatar: avatar,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ ...getInfo(newUser), google: newUser.google });
  }
};

// change username
export const changeUsername = async (req, res) => {
  const { username, user } = req.body;
  user.username = username;
  await user.save();
  return res.status(200).send("Change username successful!");
};

// change avatar
export const changeAvatar = async (req, res) => {
  const { avatar, user } = req.body;
  user.avatar = avatar;
  await user.save();
  return res.status(200).send("Change avatar successful!");
};

// add bio
export const changeBio = async (req, res) => {
  const { bio, user } = req.body;
  user.bio = bio;
  await user.save();
  return res.status(200).send("Change bio successful!");
};

// change map appearance
export const changeMapAppearance = async (req, res) => {
  const { mapAppearance, user } = req.body;
  user.mapAppearance = mapAppearance;
  await user.save();
  return res.status(200).send("Change map appearance successful!");
};

// change whole page(dark mode/light mode)
export const changeWholeAppearance = async (req, res) => {
  const { wholeAppearance, user } = req.body;
  user.wholeAppearance = wholeAppearance;
  await user.save();
  return res.status(200).send("Change web appearance successful!");
};

export const followUser = async (req, res) => {
  const { followId, user } = req.body;
  const followUser = await User.findById(followId);
  if (!followUser) {
    return res.status(404).send("User not found");
  }
  const followingList = user.following;
  // check if user have followed this user
  if (followingList.includes(followId)) {
    return res.status(400).send("User already followed " + followUser.username);
  }
  followingList.push(followId);
  user.following = followingList;
  await user.save();
  // add current user as follower
  const followers = followUser.followers;
  followers.push(user._id);
  await followUser.save();
  return res.status(200).send("Follow successful!");
};

export const unfollowUser = async (req, res) => {
  const { unfollowId, user } = req.body;
  const unfollowUser = await User.findById(unfollowId);
  if (!unfollowUser) {
    return res.status(404).send("User not found");
  }
  // check if user has followed this user
  let followingList = user.following;
  if (!followingList.includes(unfollowId)) {
    return res.status(400).send("User did not follow " + unfollowUser.username);
  }
  // remove unfollowname from the following
  followingList = followingList.filter((id) => id.toString() !== unfollowId);
  user.following = followingList;
  await user.save();

  // remove follower from unfollowUser
  let followers = unfollowUser.followers;
  followers = followers.filter((id) => id.toString() !== user._id.toString());
  unfollowUser.followers = followers;
  await unfollowUser.save();
  return res.status(200).send("Unfollow successful!");
};

// get user's following list with username
export const getFollowingList = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const followingWithName = user.following.map(async (followingUserId) => {
    const followingUser = await User.findById(followingUserId);
    return { username: followingUser.username, userId: followingUserId };
  });
  Promise.all(followingWithName).then((following) => {
    return res.status(200).json(following);
  });
};

// get user's followers list with username
export const getFollwersList = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const followersWithName = user.followers.map(async (followerUserId) => {
    const followerUser = await User.findById(followerUserId);
    return { username: followerUser.username, userId: followerUserId };
  });
  Promise.all(followersWithName).then((followers) => {
    return res.status(200).json(followers);
  });
};
