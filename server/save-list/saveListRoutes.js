import express from "express";
import {
  addItemToList,
  deleteItem,
  getSaveList,
} from "./saveListController.js";
import { checkToken } from "../utilities/checkToken.js";

const router = express.Router();

router.route("/").get(checkToken, getSaveList).post(checkToken, addItemToList);
router.route("/:location_id").delete(checkToken, deleteItem);

export default router;
