const Joi = require("joi");

const msgSchema = Joi.object({
  content: Joi.string().max(1000).messages({
    "string.max": "The description must be no more 1000 symbols.",
  }),
});

module.exports = {
  msgSchema,
};
