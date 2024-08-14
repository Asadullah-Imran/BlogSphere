import express from "express";
import { getMessage, register } from "../controllers/test.controller.js";

const router = express.Router();

router.post("/", register);
router.get("/", getMessage);

export default router;
