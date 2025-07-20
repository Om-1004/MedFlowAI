import express from "express";

const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});