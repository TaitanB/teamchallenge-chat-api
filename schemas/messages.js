const Joi = require("joi");

const msgSchema = Joi.object({
  content: Joi.string().max(300).messages({
    "string.max": "The description must be no more 300 symbols.",
  }),
});

module.exports = {
  msgSchema,
};
