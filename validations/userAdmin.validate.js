import joi from "joi"

let registerAdminValidate = joi.object({
    fullname: joi.string().required(),
    image: joi.string().optional(),
    email: joi.string().required(),
    phone: joi.string().max(13).min(9).pattern(new RegExp("^\\+?\\d+$")).required(), password: joi.string().required(),
    password: joi.string().required(),
    role: joi.string().valid("admin").required()
})

export { registerAdminValidate }