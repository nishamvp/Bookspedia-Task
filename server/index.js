import express from "express";
import dotenv from "dotenv";
import prisma from "./db/prisma.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                username: "nisham", 
                email: "sam@gmail.com",
                password: "password"
            }
        });
        res.status(200).send("User created successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
