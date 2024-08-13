import express from "express";
import { createFavBooks, getFavBooks } from "../controllers/books.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createFavBooks);
router.get("/", verifyToken, getFavBooks);

export default router;
