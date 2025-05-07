import { getSortedReminders, createReminder,updateReminder,removeReminder } from "#repositories/reminders.repo.js";
import { reminders } from "#index.js";


const remindersGet = async (req, res) => {
  const sortedReminders = await getSortedReminders();
  res.status(200).send(sortedReminders);
}

const remindersPost = async (req, res) => {
  try{
    const { content, important} = req.body;
    const response  = await createReminder(content,important)
    res.status(201).json(response);
  }catch(error){
    res.status(error.status).json({ message: error.message  });
  }
}

const remindersPatch = async (req,res) =>{
  try{
    const { id } = req.params;
    const { important, content } = req.body;
    const reminder = updateReminder(id, important,content);
    res.status(200).json(reminder);  
  }catch(error){
    res.status(error.status).json({ message:error.message})
  }
}

const remindersDelete = (req, res) => {
    try {
      const { id } = req.params;
      removeReminder(id)
      return res.status(204).send();
    } catch (error) {
      res.status(error.status || 500).json({ message:error.message})
    }
}

export { remindersGet,remindersPost,remindersPatch,remindersDelete }