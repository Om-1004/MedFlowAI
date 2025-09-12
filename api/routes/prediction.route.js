import express from "express";
import {
    createPrediction,
    getPredictionsByUser,
    getPredictionById
  } from "../controllers/predictions.controller.js";
  

const router = express.Router();

router.post("/", createPrediction);
router.get("/:userId", getPredictionsByUser);
router.get("/:userId/:predictionId", getPredictionById);

export default router;
