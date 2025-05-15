import { Router } from "express";
import { userPost, userLogout } from "../controllers/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/login", userPost);
userRouter.post("/logout", userMiddleware, userLogout);


export default userRouter;
