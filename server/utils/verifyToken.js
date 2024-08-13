import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers['access-token'] || req.cookies.token;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ status: 'failed', message: 'No token provided' });
  }

  try {
    // Verify the access token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    // If access token is invalid or expired
    if (error.name === 'TokenExpiredError') {
      // If refresh token is also not provided
      if (!refreshToken) {
        return res.status(401).json({ status: 'failed', message: 'Access denied. No refresh token provided' });
      }
      
      try {
        // Verify the refresh token
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { email: decodedRefresh.email, id: decodedRefresh.id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: process.env.JWT_EXPIRATION } // Adjust expiration time as needed
        );

        // Set the new access token as a cookie
        res.cookie('token', newAccessToken, {
          httpOnly: true,
          sameSite: 'Lax',
          secure: process.env.NODE_ENV === 'production',
        });

        // Attach user information to request object
        req.user = decodedRefresh;
        return next();
      } catch (refreshError) {
        return res.status(401).json({ status: 'failed', message: 'Refresh token expired or invalid' });
      }
    }

    // Handle other token verification errors
    return res.status(401).json({ status: 'failed', message: 'Invalid access token, authorization denied' });
  }
};

export default verifyToken;
