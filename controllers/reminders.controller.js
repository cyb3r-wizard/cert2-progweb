import { getSortedReminders, createReminder } from "#repositories/reminders.repo.js";
import { reminders } from "#index.js";


const remindersGet = async (req, res) => {
  const sortedReminders = await getSortedReminders();
  res.status(200).send(sortedReminders);
}

const remindersPost = async (req, res ) => {
  try{
    const { content, important} = req.body;
    const response  = await createReminder(content,important)
    res.status(201).json(response);
  }catch(error){
    res.status(error.status).json({ message: error.message  });
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