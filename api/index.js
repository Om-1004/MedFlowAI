// api/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import modelRouter from "./routes/model.route.js";
import predictionRouter from "./routes/prediction.route.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // IMPORTANT: before routers

app.use("/model", modelRouter);
app.use("/predictions", predictionRouter);

app.get("/health", (_req, res) => res.json({ ok: true, where: "node" }));

app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});
