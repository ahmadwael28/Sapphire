const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const invitationSchema = Joi.object({
  activityId: Joi.objectId().required(),
  participantId: Joi.objectId().required(),
  hostId: Joi.objectId(),
});

const validateInvitation = (invitation) =>
  invitationSchema.validate(invitation, { abortEarly: false });

module.exports = validateInvitation;
