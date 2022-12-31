const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const activitySchema = Joi.object({
  host: Joi.objectId().required(),
  name: Joi.string().default("").max(30),
  description: Joi.string().default("").max(1000),
  type: Joi.string().default(""),
  startDate: Joi.date().default(Date.now()),
  locationLat: Joi.number().precision(8),
  locationlng: Joi.number().precision(8),
  participants: Joi.array().items({ user: Joi.objectId() }).default([]),
  status: Joi.string()
    .valid("NOT-YET-STARTED", "STARTED", "ENDED")
    .default("Pending"),
});

const validateActivity = (activity) =>
  activitySchema.validate(activity, { abortEarly: false });

module.exports = validateActivity;
