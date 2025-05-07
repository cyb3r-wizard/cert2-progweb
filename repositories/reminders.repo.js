import { reminders } from "#index.js";
import crypto, { randomBytes } from "node:crypto";

async function getSortedReminders(){
    const sortedReminders = [...reminders].sort((a, b) => {
        return (b.important === true) - (a.important === true);
    });
    return sortedReminders;
}

async function createReminder(content, important){
    const error = new Error("");

    if(!content){
        error.message = `El mensaje no debe estar vacío`
        error.status = 400;
        throw error
    }
    if(typeof content !== "string" ){
        error.message = `El mensaje debe ser un string`
        error.status = 400;
        throw error
    }
    
    let contSpace = content.trim();
    
    if(contSpace.length <= 0){
        error.message = `El mensaje no puede ser sólo espacios`
        error.status = 400;
        throw error
    }

    if(content.length >120){
        error.message = `El mensaje es demasiado largo (max. 120 caracteres)`
        error.status = 400;
        throw error
    }
    
    if(typeof important === "undefined"){
        important = false;
    }else if (typeof important !== "boolean"){
        error.message = `Esto no es un booleano`
        error.status = 400;
        throw error
    }
    
    const reminder = {
        id: crypto.randomUUID(),
        content: content,
        createdAt: Date.now(),
        important: important,
      };

   reminders.push(reminder);
   return reminder;

}

export { getSortedReminders, createReminder }