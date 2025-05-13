import { getSortedReminders, createReminder,updateReminder,removeReminder } from "#repositories/reminders.repo.js";
import { toEditReminder, toCreateReminder } from "#utils/validations.js";
import { ValiError } from "valibot";
const remindersGet = async (req, res) => {
  const sortedReminders = await getSortedReminders();
  res.status(200).send(sortedReminders);
}

const remindersPost = async (req, res) => {
  try{
    const slayer = toCreateReminder(req.body);
    const { content, important} = slayer;
    const response  = await createReminder(content,important)
    res.status(201).json(response);
  }catch(error){
    if(error instanceof ValiError){
      res.status(400).json({ message:  error?.issues?.map(issue => issue.message) });
    }
    res.status(error.status).json({ message:error.message})
  }
}

const remindersPatch = async (req,res) =>{
  const { id } = req.params;
  console.log(id);
  try{
    const slayer = toEditReminder(req.body)
    const reminder = await updateReminder(id, slayer);
    console.log(reminder);
    res.status(200).json(reminder);
  }catch(error){
    if(error instanceof ValiError){
      return res.status(400).send();
    }
    console.error(error)
    return res.status(error.status).send();
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