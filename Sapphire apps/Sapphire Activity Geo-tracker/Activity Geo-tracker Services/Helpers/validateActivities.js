const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const activitySchema = Joi.object({
  host: Joi.objectId().required(),
  name: Joi.string().default(""),
  type: Joi.string().default(""),
  startDate: Joi.date().default(Date.now()),
  participants: Joi.array().items({ user: Joi.objectId() }).default([]),
  status: Joi.string()
    .valid("NOT-YET-STARTED", "STARTED", "ENDED")
    .default("Pending"),
});

const validateActivity = (activity) =>
  activitySchema.validate(activity, { abortEarly: false });

module.exports = validateActivity;
