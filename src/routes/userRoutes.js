
import { Router } from 'express';
import { verifyUser } from '../middleware/verifyUser.js';
import { getAllUser, blockUser,unBlockUser } from '../controllers/userControllers.js';

export const userRoutes = Router()

userRoutes.get("/",verifyUser,getAllUser)
userRoutes.patch("/block/:id",verifyUser,blockUser)
userRoutes.patch("/unblock/:id",verifyUser,unBlockUser)