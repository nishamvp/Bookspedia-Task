import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide username, email, and password",
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "Email already exists, please try logging in",
      });
    }

    // Check for unique username
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return res
        .status(409)
        .json({ status: "failed", message: "Username is taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide email and password",
      });
    }

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found, please register first",
      });
    }

    // Check if the password is correct
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid username or password" });
    }
    // Generate access token
    const accessToken =await generateToken(
      { email: existingUser.email, id: existingUser.id },
      "15m"
    );

    // Generate JWT token
    const token = await generateToken(
      { email: existingUser.email, id: existingUser.id },
      "7d"
    );

    // Set token as cookie
    const options = {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    };
    res.cookie("token", token, options);

    return res
      .status(200)
      .json({ status: "success", message: "Login successful", token:accessToken });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  if (req.user) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
};
