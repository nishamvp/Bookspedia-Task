import express from "express";
import { checkAuth, login, register } from "../controllers/authentication.js";
import verifyToken from "../utils/verifyToken.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth",verifyToken,checkAuth)

export default router;
