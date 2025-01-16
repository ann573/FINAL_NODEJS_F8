import bcrypt from "bcryptjs";
import User from "./../models/user.js";
import { successResponse, errorResponse } from "../utils/returnRes.js";
import  dotenv  from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config()

const {PRIVATE_KEY} = process.env
export const registerAccount = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    const registerAccount = await User.create(req.body);

    if (registerAccount) {
      registerAccount.password = undefined;

      successResponse(res, 201, registerAccount, "Success");
    }
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Có lỗi xảy ra, vui lòng thử lại sau");
  }
};

export const loginAccount = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return errorResponse(res, 404, "Eamil không tồn tại");
    }
    const result = bcrypt.compareSync(req.body.password, user.password);
    if (!result) {
      return errorResponse(res, 400, "Mật khẩu không đúng");
    }

    user.password=undefined
    const accessToken = jwt.sign(
      { _id: user._id, role: user.role, username: user.username },
      PRIVATE_KEY, { expiresIn: '30d' }
    );

    successResponse(res,200, {accessToken, user})
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Có lỗi xảy ra, vui lòng thử lại sau");
  }
};

