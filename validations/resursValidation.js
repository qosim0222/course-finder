import joi from "joi";

const resursValidation = joi.object({
  userId: joi.number().required(),
  name: joi.string().min(4).required(),
  media: joi.string().required(),
  desc: joi.string().required(),
  resursCategoryId: joi.number().optional()
});

const resursUpdate = joi.object({
  userId: joi.number().optional(),
  name: joi.string().min(4).optional(),
  media: joi.string().optional(),
  desc: joi.string().optional(),
  resursCategoryId: joi.number().optional()
});

const resursCategoryValidation = joi.object({
  name: joi.string().min(4).required(),
  image: joi.string().required(),
});

const resursCategoryUpdate = joi.object({
  name: joi.string().min(4).optional(),
  image: joi.string().optional(),
});

// const resursItemvalidation = joi.object({
//   resursId: joi.number().required(),
//   resursCategoryId: joi.number().required(),
// });

// const resursItemUpdate = joi.object({
//   resursId: joi.number().optional(),
//   resursCategoryId: joi.number().optional(),
// });

const sohaFanValidation = joi.object({
  yonalishId: joi.number().required(),
  name: joi.string().min(4).required(),
  image: joi.string().required(),
  type: joi.string().valid("soha", "fan").required(),
});

const sohaFanUpdate = joi.object({
  yonalishId: joi.number().optional(),
  name: joi.string().min(4).optional(),
  image: joi.string().optional(),
  type: joi.string().valid("soha", "fan").optional(),
});

export {
  resursValidation,
  resursCategoryValidation,
  // resursItemvalidation,
  sohaFanValidation,
  sohaFanUpdate,
  resursUpdate,
  resursCategoryUpdate,
  // resursItemUpdate
};
