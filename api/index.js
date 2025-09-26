import "dotenv/config";
import express from "express";
import cors from "cors";
import modelRouter from "./routes/model.route.js";
import predictionRouter from "./routes/prediction.route.js";

const app = express();

// ✅ CORS configured from env
app.use(cors({
  origin: "*",   // allow all for dev
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));


// ✅ body parsing
app.use(express.json());

// ✅ routes
app.use("/model", modelRouter);
app.use("/predictions", predictionRouter);

app.get("/health", (_req, res) => res.json({ ok: true, where: "node" }));

app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});
