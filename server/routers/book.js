import express from "express";
import { createFavBooks } from "../controllers/books.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createFavBooks);

export default router;
