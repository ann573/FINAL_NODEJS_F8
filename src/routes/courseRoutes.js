import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  getCourseByAuthorId,
  createCourse,
  editCourses,
  registerCourse,
  registeredCourse,
  deleteRegisteredCourse,
  deleteCourse
} from "./../controllers/courseController.js";
import { verifyUser } from "./../middleware/verifyUser.js";

const courseRoutes = Router();

courseRoutes.get("/", getAllCourses);

courseRoutes.get("/registered", verifyUser, registeredCourse);


courseRoutes.get("/:id", getCourseById);
courseRoutes.get("/authorId/:id", getCourseByAuthorId);

courseRoutes.delete("/:id",verifyUser, deleteCourse)

courseRoutes.post("/register/:id", verifyUser, registerCourse);
courseRoutes.delete("/register/:id", verifyUser, deleteRegisteredCourse);

courseRoutes.post("/", verifyUser, createCourse);
courseRoutes.patch("/:id", verifyUser, editCourses);
export default courseRoutes;
