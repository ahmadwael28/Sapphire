const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const userSchema = Joi.object({
  firstName: Joi.string().regex(/^[a-zA-Z-]*$/),
  lastName: Joi.string().regex(/^[a-zA-Z-]*$/),
  email: Joi.string()
    .email()
    .regex(/[^@]+@[^\.]+\..+/)
    .required(),
  username: Joi.string()
    .regex(/^[a-z0-9_-]{3,16}$/)
    .required(),
  password: Joi.string().min(8).max(16).required(),
  image: Joi.string().default("default.jpg"),
  role: Joi.string().default("User"),
  files: Joi.array().items({ file: Joi.objectId() }).default([]),
  isDeleted: Joi.boolean().default(false),
});

const validateUser = (user) => userSchema.validate(user, { abortEarly: false });

module.exports = validateUser;
