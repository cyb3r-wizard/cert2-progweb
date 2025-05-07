import { reminders } from "../index.js";
import crypto from "node:crypto";

const remindersGet = (req, res) => {
    const sortedReminders = [...reminders].sort((a, b) => {
      return (b.important === true) - (a.important === true);
    });
res.status(200).send(sortedReminders);
}

const remindersPost = (req, res) => {
    try {
      let { content, important } = req.body;
  
      if (typeof content !== "string") {
        return res.status(400).json({ message: "El mensaje debe ser un string" });
      }
      let contSpace = content.trim();
      if (contSpace.length <= 0) {
        return res
          .status(400)
          .json({ message: "El mensaje no pueden ser sólo espacios" });
      }
      if (content.length > 120) {
        return res.status(400).json({
          message: "El mensaje es demasiado largo (max. 120 caracteres)",
        });
      }
  
      if (typeof important === "undefined") {
        important = false;
      } else if (typeof important !== "boolean") {
        return res.status(400).json({
          message: "Esto no es un booleano!",
        });
      }
  
      const reminder = {
        id: crypto.randomUUID(),
        content: content,
        createdAt: Date.now(),
        important: important,
      };
      reminders.push(reminder);
      res.status(201).json(reminder).send();
    } catch (error) {
      res.status(400).json({ error: `ERROR: ${error}` });
    }
}

const remindersPatch = (req, res) => {
    try {
      const { id } = req.params;
      const reminderIndex = reminders.findIndex((reminder)=>reminder.id === id);
      
  
      if (reminderIndex === -1) {
        return res.status(404).send();
      }
      let reminder = reminders[reminderIndex];
      let { important, content } = req.body;
      
      if (typeof important !== "undefined") {
        if (typeof important !== "boolean") {
          return res.status(400).json({ message: "important debe ser booleano" });
        }
        reminder.important = important;
      }
      
      if (typeof content !== "undefined") {
        if (typeof content !== "string") {
          return res.status(400).json(reminder);
        } 
  
        content = content.toString();
        let contSpace = content.trim();
  
        if (content.length > 120) {
          return res.status(400).json(reminder);
        }
        if (contSpace.length <= 0) {
          return res.status(400).json(reminder);
        }
        reminder.content = content;
      }
      if (typeof reminder.completed === "undefined") {
        reminder.completed = false;
      }
      return res.status(200).json({
        id: reminder.id,
        content: reminder.content,
        createdAt: reminder.createdAt,
        important: reminder.important,
        completed: reminder.completed,
      });
    } catch (error) {
      return res.status(400).json({ error: `reminder router error: ${error}` });
    }
}

const remindersDelete = (req, res) => {
    try {
      const { id } = req.params;
  
      let index = reminders.findIndex(reminder => reminder.id === id);
      if (index === -1) {
        return res.status(404).send();
      }
      reminders.splice(index,1);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: `ERROR ${error}` });
    }
}

export { remindersGet,remindersPost,remindersPatch,remindersDelete }