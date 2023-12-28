import express from "express";
import connect from "../dbConfig/index.js";
import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.route.js";
import cors from 'cors';
import cookieParser from "cookie-parser"


const app = express();
connect();

app.use(express.json());
app.use(cors());

app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
