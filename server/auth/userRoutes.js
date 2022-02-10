import express from "express";
import {
  signup,
  login,
  logout,
  getUser,
  googleLogin,
} from "./userControllers.js";
import { checkSignUp, checkGoogle } from "./userMiddle.js";

const router = express.Router();

router.route("/signup").post(checkSignUp, signup);
router.route("/login").post(login);
router.route("/google/login").post(checkGoogle, googleLogin);
router.route("/logout").post(logout);
router.route("/:id").get(getUser);

export default router;
