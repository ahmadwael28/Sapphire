const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const RequestSchema = Joi.object({
  activityId: Joi.objectId().required(),
  participantId: Joi.objectId(),
  hostId: Joi.objectId(),
  status: Joi.string()
    .valid("PENDING", "ACCEPTED", "REJECTED", "CANCELED")
    .default("PENDING"),
});

const validateRequest = (Request) =>
  RequestSchema.validate(Request, { abortEarly: false });

module.exports = validateRequest;
