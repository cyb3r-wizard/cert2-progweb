import crypto from "node:crypto";
import { client } from "#prisma/client.js";

async function getSortedReminders() {
    const rem = await client.reminder.findMany()
    const sortedReminders = [...rem].sort((a, b) => {
        return (b.important === true) - (a.important === true);
    });
    return sortedReminders;
}

async function createReminder(content, important) {
    const reminder = {
        id: crypto.randomUUID(),
        content: content,
        createdAt: new Date(),
        important: important,
    };
    return client.reminder.create({
        data: reminder,
    });
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
    return reminder;
}

async function removeReminder(id) {
    const error = new Error("");
    const rem = await client.reminder.delete({where:{id:id}})
    if(!rem){
        error.message = "recordatorio no encontrado"
        error.status = 404
        throw error
    }
    return true;
}

export { getSortedReminders, createReminder, updateReminder, removeReminder }