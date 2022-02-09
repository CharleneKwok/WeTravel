import express from "express";
import { signup, login, logout, getUser } from "./userControllers.js";
import { checkSignUp } from "./userMiddle.js";

const router = express.Router();

router.route("/signup").post(checkSignUp, signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/:id").get(getUser);

export default router;
