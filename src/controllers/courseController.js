import mongoose from "mongoose";
import { successResponse, errorResponse } from "../utils/returnRes.js";
import Course from "./../models/course.js";
import User from "./../models/user.js";

export const getAllCourses = async (req, res) => {
  try {
    const data = await Course.find();

    return successResponse(res, 200, data);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Có lỗi xảy ra vui lòng thử lại sau");
  }
};

export const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return errorResponse(res, 400, "ID không hợp lệ khi lấy một Course theo ID");
    }

    const data = await Course.findById(id);

    if (!data) {
      return errorResponse(res, 404, "Course not found");
    }

    return successResponse(res, 200, data);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Có lỗi xảy ra vui lòng thử lại sau");
  }
};

export const getCourseByAuthorId = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return errorResponse(res, 400, "ID không hợp lệ");
    }

    const data = await Course.find({ author: id }).select("-students");

    if (data.length === 0) {
      return successResponse(res, 404, "Course not found");
    }

    return successResponse(res, 200, data);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "Có lỗi xảy ra vui lòng thử lại sau");
  }
};

export const createCourse = async (req, res) => {
  try {
    if (req.role !== "admin" && req.role !== "superAdmin") {
      errorResponse(res, 400, "Bạn không có quyền vào trang này");
    }

    const newBody = { ...req.body, author: req.auThorId };

    const data = await Course.create(newBody);
    const author = await User.findByIdAndUpdate(req.auThorId, {
      $push: { courses: data._id },
    });
    console.log(author);

    successResponse(res, 201, data);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Có lỗi!!!!!");
  }
};

export const editCourses = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return errorResponse(res, 400, "ID không hợp lệ");
    }
    const course = await Course.findById(id);

    if (!course) {
      return errorResponse(res, 404, "Course not found");
    }

    if (course.author.toString() !== req.auThorId) {
      return errorResponse(
        res,
        400,
        "Bạn không thể sửa khóa học không phải của bạn"
      );
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      timestamps: true,
    });

    successResponse(res, 200, updatedCourse);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Có lỗi!!!!!");
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return errorResponse(res, 400, "ID không hợp lệ");
    }
    const course = await Course.findById(id);

    if (!course) {
      return errorResponse(res, 404, "Course not found");
    }

    if (course.author.toString() !== req.auThorId) {
      return errorResponse(
        res,
        400,
        "Bạn không thể xóa khóa học không phải của bạn"
      );
    }

    if (course.students.length !== 0) {
      return errorResponse(res, 400, "Course has students");
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    await User.findByIdAndUpdate(deletedCourse.author, {
      $pull: { courses: deletedCourse._id },
    });

    if (!deletedCourse) {
      errorResponse(res, 404, "Xóa thất bại, khóa học không tồn tại");
    }
    successResponse(res, 200, deletedCourse, "Xóa sản phẩm thành công");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Có lỗi!!!!!");
  }
};

export const registerCourse = async (req, res) => {
  const id = req.params.id;

  const courseWithStudent = await Course.findOne({
    _id: id, 
    students: req.auThorId, 
  });

  if(courseWithStudent){
    return errorResponse(res,400,"Registered")
  }
  await User.findByIdAndUpdate(req.auThorId, {
    $addToSet: { coursesRegistered: id },
  });

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $addToSet: { students: req.auThorId },
    },
    { new: true }
  ).populate("students","-password");

  successResponse(res, 200, course);
};

export const registeredCourse = async (req, res) => {
  try {
    const course = await User.findById(req.auThorId)
      .populate("coursesRegistered", "-students")
      .select("coursesRegistered -_id");

    if (!course) {
      errorResponse(res, 404, "No course registered");
    }
    successResponse(res, 200, course);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Có lỗi");
  }
};

export const deleteRegisteredCourse = async (req, res) => {
  try {

    const isRegistered = await User.findOne({
      _id: req.auThorId,
      coursesRegistered: req.params.id
    }) 
    if(!isRegistered){
      return errorResponse(res,400,"Khóa học chưa đăng ký")
    }

    await User.findByIdAndUpdate(req.auThorId, {
      $pull: { coursesRegistered: req.params.id },
    });

    await Course.findByIdAndUpdate(req.params.id, {
      $pull: { students: req.auThorId },
    });

    successResponse(res, 200, [],"Hủy đăng kí khóa học thành công");
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Có lỗi");
  }
};
