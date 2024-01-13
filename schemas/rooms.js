const Joi = require("joi");
const { topicsEnum, nameRegex, textRegex } = require("../constants/constants");

const roomAddSchema = Joi.object({
  title: Joi.string().min(2).max(30).pattern(nameRegex).required().messages({
    "string.base": "The title must be a string of 2 to 30 symbols.",
    "string.min": "The title must be not less 2 symbols.",
    "string.max": "The title must be no more 30 symbols.",
    "any.required": "The title field is required.",
  }),
  description: Joi.string().max(300).pattern(textRegex).messages({
    "string.max": "The description must be no more 300 symbols.",
  }),
  topic: Joi.string()
    .valid(...Object.keys(topicsEnum))
    .required()
    .messages({
      "any.required": "The topic is required for public rooms.",
    }),
  img: Joi.string(),
});

const roomEditSchema = Joi.object({
  title: Joi.string().min(2).max(30).pattern(textRegex).required().messages({
    "string.base": "The title must be a string of 4 to 30 symbols.",
    "string.min": "The title must be not less 4 symbols.",
    "string.max": "The title must be no more 30 symbols.",
    "any.required": "The title field is required.",
  }),
  description: Joi.string().max(300).pattern(textRegex).messages({
    "string.max": "The description must be no more 300 symbols.",
  }),
});

module.exports = {
  roomAddSchema,
  roomEditSchema,
};
