// api/routes/model.route.js
import express from "express";
import { sendData, test } from "../controllers/model.controller.js";
const router = express.Router();

router.get("/test", test);
router.post("/sendData", sendData);

export default router;
