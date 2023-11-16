const Joi = require("joi");
const { textRegex } = require("../constants/constants");

const msgSchema = Joi.object({
  content: Joi.string().max(1000).pattern(textRegex).required().messages({
    "string.max": "The description must be no more 1000 symbols.",
    "any.required": "The content field is required.",
  }),
});

module.exports = {
  msgSchema,
};
