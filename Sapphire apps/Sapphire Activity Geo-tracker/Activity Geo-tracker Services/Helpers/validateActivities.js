const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const activitySchema = Joi.object({
  host: Joi.objectId(),
  name: Joi.string().default("").max(30).required(),
  description: Joi.string().default("").max(1000),
  type: Joi.string().default("").required(),
  startDate: Joi.date().default(Date.now()),
  locationLat: Joi.number().required(),
  locationLng: Joi.number().required(),
  participants: Joi.array().items({ user: Joi.objectId() }).default([]),
  status: Joi.string()
    .valid("NOT-YET-STARTED", "STARTED", "ENDED")
    .default("NOT-YET-STARTED"),
});

const validateActivity = (activity) =>
  activitySchema.validate(activity, { abortEarly: false });

module.exports = validateActivity;
