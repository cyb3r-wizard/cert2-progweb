import * as v from "valibot";

const reminderSchema = v.object({
    content: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(1),
        v.maxLength(255)
    ),
    important: v.optional(
        v.boolean(),
        false
    )
})
