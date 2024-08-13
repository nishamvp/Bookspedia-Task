import jwt from "jsonwebtoken";

export const generateToken = async (user,expires) => {
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: expires });
  return token;
};