import { Router } from "express";
import {
  registerAccount,
  loginAccount,
} from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validation/authValidation.js";
import { validateBody } from "../middleware/validateBody.js";
export const authRoutes = Router();

authRoutes.post("/register", validateBody(registerSchema), registerAccount);

authRoutes.post("/login", validateBody(loginSchema), loginAccount);
