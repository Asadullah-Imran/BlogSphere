import express from "express";
import {
  addCommentToPost,
  addOrRemoveReactionToPost,
  createPost,
  deleteComment,
  deletePost,
  getCommentsForPost,
  getPostById,
  getPosts,
  getReactionsForPost,
  updateComment,
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
// Update comment
router.put("/comments/:commentId", verifyJWT, updateComment);
// Delete comment
router.delete("/comments/:commentId", verifyJWT, deleteComment);

// Reactions
router.get("/:id/reactions", getReactionsForPost);
router.post("/:id/reactions", verifyJWT, addOrRemoveReactionToPost);

export default router;
