import crypto from "node:crypto";
import { client } from "#prisma/client.js";

async function getSortedReminders() {
    const reminder = await client.reminder.findMany()
    const rem = reminder.map(reminder => ({ ...reminder, createdAt:Number(reminder.createdAt)}))
    const sortedReminders = [...rem].sort((a, b) => {
        return (b.important === true) - (a.important === true);
    });
    return sortedReminders;
}

async function createReminder(content, important) {
    try{
    const reminder = {
        id: crypto.randomUUID(),
        content: content,
        createdAt: Date.now(),
        important: important,
    };
    const rem = await client.reminder.create({
        data: reminder,
    });
    rem.createdAt = Number(rem.createdAt);
    return rem;
    }catch(error){
        throw error
    }
}

async function updateReminder(id, update) {
    let { content, important } = update;
    const rem = await client.reminder.findUnique({ where:{id: id} })
    if(!rem){
        const err = new Error("Reminder not found");
        err.status = 404;
        throw err;
    }
    const data = {}
    if (typeof important !== "undefined") {
        data.important = important;
    }

    if (typeof content !== "undefined") {
        content = content.toString();
        data.content = content;
    }
    const reminder = await client.reminder.update({where:{id:id}, data: data })
    reminder.createdAt = Number(reminder.createdAt);
    return reminder;
}

async function removeReminder(id) {
    try{
        await client.reminder.delete({where:{id:id}})
        return true;
    }catch(e){
            if (e.code === 'P2025') {
            const err = new Error("recordatorio no encontrado");
            err.status = 404;
            throw err;
        }
        throw error
    }

}

export { getSortedReminders, createReminder, updateReminder, removeReminder }