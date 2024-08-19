import express from "express";
import { getPostsByUserId } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/:userId", getPostsByUserId);

export default router;
