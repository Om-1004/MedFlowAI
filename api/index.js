import express from "express";
import userRouter from "./routes/model.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/model", userRouter);

app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});
