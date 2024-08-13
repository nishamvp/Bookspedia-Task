import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  const token = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
export const generateAccessToken = async (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });
  return token;
};
