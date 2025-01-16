import { Router } from "express";
import { authRoutes } from "./authRoutes.js";
import courseRoutes from "./courseRoutes.js";
import { userRoutes } from "./userRoutes.js";

const routes = Router();

routes.use("/api/auth", authRoutes)
routes.use("/api/courses",courseRoutes)
routes.use("/api/users", userRoutes)
export default routes;
