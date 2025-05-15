import * as v from "valibot";

const reminderSchema = v.object({
    content: v.pipe(
        v.string(),
        v.transform(String),
        v.trim(),
        v.minLength(1),
        v.maxLength(120)
    ),
    important: v.optional(
        v.boolean(),
        false
    )
})

const userSchema = v.object({
    username: v.pipe(
        v.string(),
        v.transform(String)
    ),
    password: v.pipe(
        v.string(),
        v.transform(String)
    )
})

const reminderPatchSchema = v.partial(reminderSchema);

const toEditReminder = v.parser(reminderPatchSchema);
const toCreateReminder =  v.parser(reminderSchema);
const toValidateUser = v.parser(userSchema);

export {
  toEditReminder, 
  toCreateReminder,
  toValidateUser
}