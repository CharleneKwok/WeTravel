import express from "express";
import { checkUserToken } from "../utilities/checkToken.js";
import {
  signup,
  login,
  logout,
  getUser,
  googleLogin,
  changeUsername,
  changeAvatar,
  changeBio,
  changeMapAppearance,
  changeWholeAppearance,
  followUser,
  unfollowUser,
  getFollowingList,
  getFollwersList,
} from "./userControllers.js";
import { checkSignUp, checkGoogle } from "./userMiddle.js";

const router = express.Router();

router.route("/signup").post(checkSignUp, signup);
router.route("/login").post(login);
router.route("/google/login").post(checkGoogle, googleLogin);
router.route("/logout").post(logout);
router.route("/:userId").get(checkUserToken, getUser);

router.route("/settings/username").put(checkUserToken, changeUsername);
router.route("/settings/avatar").put(checkUserToken, changeAvatar);
router.route("/settings/bio").put(checkUserToken, changeBio);
router.route("/settings/map").put(checkUserToken, changeMapAppearance);
router.route("/settings/whole").put(checkUserToken, changeWholeAppearance);

router.route("/follow").put(checkUserToken, followUser);
router.route("/unfollow").put(checkUserToken, unfollowUser);

router.route("/following/:userId").get(checkUserToken, getFollowingList);
router.route("/followers/:userId").get(checkUserToken, getFollwersList);

export default router;
