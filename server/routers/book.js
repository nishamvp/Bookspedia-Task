import express from "express";
import {
  createFavBooks,
  deleteFavBooks,
  editFavBooks,
  getFavBooks,
} from "../controllers/books.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createFavBooks);
router.get("/", verifyToken, getFavBooks);
router.patch("/:id", verifyToken, editFavBooks);
router.delete("/:id", verifyToken, deleteFavBooks);

export default router;
