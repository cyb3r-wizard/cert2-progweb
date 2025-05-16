import { getSortedReminders, createReminder,updateReminder,removeReminder } from "#repositories/reminders.repo.js";
import { ValiError } from "valibot";
const remindersGet = async (req, res) => {
  try{
    const sortedReminders = await getSortedReminders();
    res.status(200).send(sortedReminders);
  }catch(error){
    res.status(error.status || 500).json('Error al obtener Recordatorios')
  }

}

const remindersPost = async (req, res) => {
  try{
    const { content, important} = req.body;
    const response  = await createReminder(content,important)
    res.status(201).json(response);
  }catch(error){
    if(error instanceof ValiError){
      res.status(400).json({ message:  error?.issues?.map(issue => issue.message) });
    }
    res.status(error.status || 500).json({ message:error.message})
  }
}

const remindersPatch = async (req,res) =>{
  const { id } = req.params;
  try{
    const reminder = await updateReminder(id, req.body);
    res.status(200).json(reminder);
  }catch(error){
    if(error instanceof ValiError){
      return res.status(400).send();
    }
    console.error(error)
    return res.status(error.status || 500).send();
  }
}

const remindersDelete = async (req, res) => {
    try {
      const { id } = req.params;
      const reminderRemoved = await removeReminder(id);
      if(reminderRemoved){
        return res.status(204).send();
      }
      return res.status(404).send();
    } catch (error) {
      res.status(error.status || 500).json({ message:error.message})
    }
}

export { remindersGet,remindersPost,remindersPatch,remindersDelete }