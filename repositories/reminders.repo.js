import { reminders } from "#index.js";
import crypto from "node:crypto";

async function getSortedReminders(){
    const sortedReminders = [...reminders].sort((a, b) => {
        return (b.important === true) - (a.important === true);
    });
    return sortedReminders;
}

async function createReminder(content, important){   
    const reminder = {
        id: crypto.randomUUID(),
        content: content,
        createdAt: Date.now(),
        important: important,
      };

   reminders.push(reminder);
   return reminder;
}

function updateReminder(id, important, content){
    const error = new Error("");
    const reminderIndex = reminders.findIndex(reminder => reminder.id === id);
    
    if(reminderIndex === -1){
        error.message = 'No se encontró el recordatorio'
        error.status = 404
        throw error;
    }   

    const reminder = reminders[reminderIndex];


    if (typeof important !== "undefined") {
        /*
        if (typeof important !== "boolean") {
            error.message = 'Important debe ser booleano'
            error.status = 400
            throw error;
        }
        */
        reminder.important = important;
    }

    if (typeof content !== "undefined") {
        if (typeof content !== "string") {
            error.message = 'Important debe ser un string'
            error.status = 400
            throw error;
        } 
  
        content = content.toString();
        let contSpace = content.trim();
  
        if (content.length > 120) {
            error.message = `El mensaje es demasiado largo (max. 120 caracteres)`
            error.status = 400;
            throw error
        }
        if (contSpace.length <= 0) {
            error.message = `El mensaje no puede ser sólo espacios`
            error.status = 400;
            throw error
        }


        reminder.content = content;
    }

    if (typeof reminder.completed === "undefined") {
        reminder.completed = false;
    }

    return {
        id: reminder.id,
        content: reminder.content,
        createdAt: reminder.createdAt,
        important: reminder.important,
        completed: reminder.completed,
    };
}

function removeReminder(id){
    const error = new Error("");
    let index = reminders.findIndex(reminder => reminder.id === id);
    if(index === -1){
        error.message = "recordatorio no encontrado"
        error.status = 404
        throw error
    }
    reminders.splice(index,1);
    return true;
}

export { getSortedReminders, createReminder,updateReminder,removeReminder }