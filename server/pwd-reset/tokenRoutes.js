import express from "express";
import { requestPwdReset } from "./tokenControllers.js";

const router = express.Router();

router.route("/").post(requestPwdReset);

export default router;
