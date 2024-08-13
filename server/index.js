import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routers/user.js";
import bookRouter from "./routers/book.js";

dotenv.config();

const app = express();
const PORT = 3000;

//Middlewars
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/user", userRouter);
app.use("/book", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
