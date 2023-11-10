const Joi = require("joi");
const { topicsEnum } = require("../constants/constants");

const roomAddSchema = Joi.object({
  title: Joi.string().min(4).max(30).required().messages({
    "string.base": "The title must be a string of 4 to 30 symbols.",
    "string.min": "The title must be not less 4 symbols.",
    "string.max": "The title must be no more 30 symbols.",
    "any.required": "The title field is required.",
  }),
  description: Joi.string().max(300).messages({
    "string.max": "The description must be no more 300 symbols.",
  }),
  type: Joi.string().valid("public", "private").required().messages({
    "any.required": "The type is required.",
  }),
  topic: Joi.string().when("type", {
    is: "public",
    then: Joi.string()
      .valid(...Object.values(topicsEnum))
      .required()
      .messages({
        "any.required": "The topic is required for public rooms.",
      }),
    otherwise: Joi.string().forbidden(),
  }),
});

const roomEditSchema = Joi.object({
  title: Joi.string().min(4).max(30).required().messages({
    "string.base": "The title must be a string of 4 to 30 symbols.",
    "string.min": "The title must be not less 4 symbols.",
    "string.max": "The title must be no more 30 symbols.",
    "any.required": "The title field is required.",
  }),
  description: Joi.string().max(300).messages({
    "string.max": "The description must be no more 300 symbols.",
  }),
});

module.exports = {
  roomAddSchema,
  roomEditSchema,
};
