import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routers/user.js";
import bookRouter from "./routers/book.js";

dotenv.config();

const app = express();
const PORT = 3000;

//Middlewars
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/book", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
