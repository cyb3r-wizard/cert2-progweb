import { Router } from "express";
import { userPost, userLogout } from "../controllers/user.controller.js";
import { userMiddleware } from "../middleware/user.middleware.js";
import { validateBody } from "#middleware/validation.middleware.js";
import { toValidateUser } from "#utils/validations.js";

const userRouter = Router();

userRouter.post("/login",validateBody(toValidateUser), userPost);
userRouter.post("/logout", userMiddleware, userLogout);


export default userRouter;
