import express from "express";
import { signup, login } from "./userControllers.js";
import { checkSignUp } from "./userMiddle.js";

const router = express.Router();

router.route("/signup").post(checkSignUp, signup);
router.route("/login").post(login);

export default router;
