import express from "express";
import { checkUserToken } from "../utilities/checkToken.js";
import {
  addComment,
  addPost,
  deletePost,
  getComments,
  getPosts,
  likePost,
  replyComment,
  unlikePost,
  getReplies,
  getRandomPosts,
} from "./postsController.js";

const router = express.Router();

router.route("/").post(checkUserToken, addPost);
router.route("/:postId").delete(checkUserToken, deletePost);
router.route(`/randomPosts/:offset`).get(getRandomPosts);
router.route("/:userId/:offset").get(checkUserToken, getPosts);
router.route("/like/:postId").put(checkUserToken, likePost);
router.route("/unlike/:postId").put(checkUserToken, unlikePost);
router.route("/comment/:postId").post(checkUserToken, addComment);
router.route("/comment/:postId/:offset").get(checkUserToken, getComments);
router
  .route("/reply/:commentId")
  .post(checkUserToken, replyComment)
  .get(checkUserToken, getReplies);

export default router;
