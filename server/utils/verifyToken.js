import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers["access-token"] || req.cookies.token;
  const refreshToken = req.cookies.token;

  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ status: "failed", message: "No token provided" });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    // If there is no refreshtoken
    if (!refreshToken) {
      return response
        .status(401)
        .json({ error: "Access denied. No refresh token provided" });
    }
    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      const newAccessToken = jwt.sign(
        { email: decodedRefresh.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30m" }
      );
      req.user = decodedRefresh;
      res.setHeader("access-token", newAccessToken);
      return next();
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Refresh token expired or invalid" });
    }
  }
};

export default verifyToken;
