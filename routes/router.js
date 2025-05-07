import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import userRouter from "./user.route.js";
import reminderRouter from "./reminder.route.js";

const router = Router();

router.use("/auth/login", userRouter);
router.use("/reminders", userMiddleware, reminderRouter);

export default router;
