import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        "string.base": "Have to be string",
        "string.min": "Min 3 characters",
        "string.max": "Max 20 characters",
         "any.required": "Name is required"
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
        "string.min": "Min 3 characters",
        "string.max": "Max 20 characters",
         "any.required": "PhoneNumber is required"
  }),
  email: Joi.string().email().min(3).max(20).messages({
        "string.base": "Have to be string",
        "string.min": "Min 3 characters",
        "string.max": "Max 20 characters",
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal')
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(5).max(20),
  phoneNumber: Joi.string().min(10).max(12),
  email: Joi.string().email().min(5).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});




