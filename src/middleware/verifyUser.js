import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const { PRIVATE_KEY } = process.env;
export const verifyUser = (req, res, next) => {
  if (!req.headers.authorization)
  {
    return res.status(400).json({message: "Chưa đăng nhập"})
  }
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, PRIVATE_KEY);

  req.role = decoded.role
  req.auThorId = decoded._id

  next()
};
