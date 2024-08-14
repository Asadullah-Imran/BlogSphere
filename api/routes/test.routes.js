import express from "express";
import { getUser, register } from "../controllers/test.controllers.js";

const router = express.Router();

router.post("/", register);
router.get("/", getUser);

export default router;
