import * as v from "valibot";

const reminderSchema = v.object({
    content: v.pipe(
        v.string(),
        v.transform(String),
        v.trim(),
        v.minLength(1),
        v.maxLength(255)
    ),
    important: v.optional(
        v.boolean(),
        false
    )
})

const reminderPatchSchema = v.partial(reminderSchema);

const toEditReminder = v.parser(reminderPatchSchema);
const toCreateReminder =  v.parser(reminderSchema);

export {
  toEditReminder, 
  toCreateReminder
}