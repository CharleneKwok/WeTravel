import express from "express";
import { signup } from "./userControllers.js";
import { checkSignUpValid } from "./userMiddle.js";

const router = express.Router();

router.route("/signup").post(checkSignUpValid, signup);

export default router;
