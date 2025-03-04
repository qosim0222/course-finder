import joi from "joi"

const regionUpdate = joi.object({
    name: joi.string().optional()
})

const oquvMarkazUpdate = joi.object({
    userId: joi.number().optional(),
    name: joi.string().optional(),
    filialSoni: joi.number().optional(),
    address: joi.string().optional(),
    location: joi.string().optional(),
    regionId: joi.number().optional()
})

const filialUpdate = joi.object({
    oquvMarkazId: joi.number().optional(),
    regionId: joi.number().optional(),
    name: joi.string().optional(),
    address: joi.string().optional(),
    location: joi.string().optional()
})

const yonalishUpdate = joi.object({
    name: joi.number().required(),
    image: joi.string().required()
})

const oquvMarkazYonalishUpdate = joi.object({
    name: joi.number().required(),
    image: joi.string().required()
})

const yozilishUpdate = joi.object({
    userId: joi.number().required(),
    yonalishId: joi.number().required()
})

export { regionUpdate, oquvMarkazUpdate, filialUpdate, yonalishUpdate, oquvMarkazYonalishUpdate, yozilishUpdate }