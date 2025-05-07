import { Router } from "express";
import { userPost } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", userPost);

export default userRouter;
