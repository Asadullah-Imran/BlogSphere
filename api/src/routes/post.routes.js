import express from "express";
import {
  addCommentToPost,
  addReactionToPost,
  createPost,
  deletePost,
  getCommentsForPost,
  getPostById,
  getPosts,
  getReactionsForPost,
  updatePost,
} from "../controllers/post.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Define routes
router.post("/", verifyJWT, upload.single("image"), createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

// Comments;
router.get("/:id/comments", getCommentsForPost);
router.post("/:id/comments", verifyJWT, addCommentToPost);

// Reactions
router.get("/:id/reactions", getReactionsForPost);
router.post("/:id/reactions", verifyJWT, addReactionToPost);

export default router;
