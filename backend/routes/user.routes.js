import express from "express";
import { getProfile, updateProfile, getPublicProfile } from "../controllers/user.controller.js";
import {protect} from "../middleware/auth.middleware.js"
import upload from "../middleware/upload.middleware.js"

const userRouter=express.Router();

userRouter.get("/profile",protect,getProfile);
userRouter.put("/profile",protect,upload.single("profilePic"),updateProfile);
userRouter.get("/public/:id",getPublicProfile);
userRouter.get("/:id",getPublicProfile);

export default userRouter;