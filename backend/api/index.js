import express from "express";
import connect from "../dbConfig/index.js";
import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.route.js";

const app = express();
connect();

app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
