import { Router } from "express";
import { remindersDelete, remindersGet, remindersPatch, remindersPost } from "#controllers/reminders.controller.js";
import { validateBody, validateParams } from "#middleware/validation.middleware.js";
import { toCreateReminder, toEditReminder, toGetIdSchema } from "#utils/validations.js";
const reminderRouter = Router();


reminderRouter.get("/", remindersGet);
reminderRouter.post("/", validateBody(toCreateReminder), remindersPost);
reminderRouter.patch("/:id", validateParams(toGetIdSchema), validateBody(toEditReminder), remindersPatch);
reminderRouter.delete("/:id", validateParams(toGetIdSchema), remindersDelete)


export default reminderRouter;

