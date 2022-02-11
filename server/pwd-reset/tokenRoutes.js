import express from "express";
import { requestPwdReset, resetPwd } from "./tokenControllers.js";

const router = express.Router();

router.route("/").post(resetPwd);
router.route("/sendmail").post(requestPwdReset);

export default router;
