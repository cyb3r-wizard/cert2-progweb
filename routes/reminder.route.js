import { Router } from "express";
import { remindersDelete, remindersGet, remindersPatch, remindersPost } from "#controllers/reminders.controller.js";
const reminderRouter = Router();

reminderRouter.get("/", remindersGet);
reminderRouter.post("/", remindersPost);
reminderRouter.patch("/:id", remindersPatch);
reminderRouter.delete("/:id", remindersDelete)


export default reminderRouter;

