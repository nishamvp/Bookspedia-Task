import express from "express";
import dotenv from "dotenv";
import prisma from "./db/prisma.js";
import router from "./routers/user.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/user',router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
