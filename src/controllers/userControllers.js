import mongoose from "mongoose";
import User from "../models/user.js";
import { errorResponse, successResponse } from "../utils/returnRes.js";

export const getAllUser = async (req, res) => {
  try {
    if (req.role !== "superAdmin") {
      return errorResponse(res, 403, "Forbidden");
    }

    const user = await User.find()
      .populate([{ path: "courses" }, { path: "coursesRegistered" }])
      .select("-password");

    successResponse(res, 200, user);
  } catch (error) {
    errorResponse(res, 500, "Có lỗi!!!!!!!!!");
  }
};

export const blockUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return errorResponse(res, 400, "ID không hợp lệ");
    }
    if (req.role !== "superAdmin") {
      return errorResponse(res, 403, "Forbidden");
    }

    const dateBlock = Date.now();
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { blockedAt: dateBlock},
      },
      { new: true }
    ).select("-password");

    successResponse(res, 200, blockUser, "Block user thành công");
  } catch (error) {
    console.log(error)
    errorResponse(res, 500, "Có lỗi!!!!!!!!!");
  }
};

export const unBlockUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return errorResponse(res, 400, "ID không hợp lệ");
    }
    if (req.role !== "superAdmin") {
      return errorResponse(res, 403, "Forbidden");
    }
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { blockedAt: null},
      },
      { new: true }
    ).select("-password");

    successResponse(res, 200, blockUser, "UnBlock user thành công");
  } catch (error) {
    console.log(error)
    errorResponse(res, 500, "Có lỗi!!!!!!!!!");
  }
};
