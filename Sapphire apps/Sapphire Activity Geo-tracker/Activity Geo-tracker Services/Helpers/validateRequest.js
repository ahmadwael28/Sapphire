const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const activitySchema = Joi.object({
  activityId: Joi.objectId().required(),
  participantId: Joi.objectId().required(),
  hostId: Joi.objectId().required()
});

const validateActivity = (activity) =>
  activitySchema.validate(activity, { abortEarly: false });

module.exports = validateActivity;
