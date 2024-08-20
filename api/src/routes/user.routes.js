import express from "express";
import {
  getPostsByUserId,
  updateUser,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/:userId", getPostsByUserId);
router.put("/:userId", upload.single("profilePic"), updateUser);
// router.put("/:userId", verifyJWT, upload.single("profilePic"), updateUser);

export default router;
