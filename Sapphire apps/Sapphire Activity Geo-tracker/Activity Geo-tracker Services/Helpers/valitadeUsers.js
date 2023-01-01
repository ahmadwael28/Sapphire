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
  isDeleted: Joi.boolean().default(false),
  age: Joi.number().min(2).max(120),
  weight: Joi.number().min(8).max(400),
  height: Joi.number().min(50).max(300),
  activities: Joi.array().items({ activity: Joi.objectId() }).default([]),
  requests: Joi.array().items({ request: Joi.objectId() }).default([]),
  invitations: Joi.array().items({ invitation: Joi.objectId() }).default([]),
});

const validateUser = (user) => userSchema.validate(user, { abortEarly: false });

module.exports = validateUser;
