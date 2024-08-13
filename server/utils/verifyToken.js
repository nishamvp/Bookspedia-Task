import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "No token provided, authorization denied",
      });
    }

    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Attach user information to request object
    req.user = decoded;

    // Pass control to the next middleware
    next();
  } catch (error) {
    // Handle errors, such as token expiration or invalid token
    return res.status(401).json({
      status: "failed",
      message: "Invalid token, authorization denied",
    });
  }
};

export default verifyToken;
