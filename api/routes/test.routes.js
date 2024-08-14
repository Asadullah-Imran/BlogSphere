import express from "express";
import { getMessage, register } from "../controllers/test.controllers.js";

const router = express.Router();

router.post("/", register);
router.get("/", getMessage);

export default router;
