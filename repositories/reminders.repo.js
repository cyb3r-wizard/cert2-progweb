import { reminders } from "#index.js";
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

function updateReminder(id, update) {
    let { content, important } = update;
    const reminderIndex = reminders.findIndex(reminder => reminder.id === id);
    if (reminderIndex === -1) {
        const error = new Error("Reminder not found");
        error.status = 404;
        throw error;
    }

    let reminder = reminders[reminderIndex];

    if (typeof important !== "undefined") {
        reminder.important = important;
    }

    if (typeof content !== "undefined") {
        content = content.toString();
        reminder.content = content;
    }

    if (typeof reminder.completed === "undefined") {
        reminder.completed = false;
    }

    return reminder;
}

function removeReminder(id) {
    const error = new Error("");
    let index = reminders.findIndex(reminder => reminder.id === id);
    if (index === -1) {
        error.message = "recordatorio no encontrado"
        error.status = 404
        throw error
    }
    reminders.splice(index, 1);
    return true;
}

export { getSortedReminders, createReminder, updateReminder, removeReminder }