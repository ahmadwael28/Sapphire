const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const fileSchema = Joi.object({
  user: Joi.objectId().required(),
  date: Joi.date().default(Date.now()),
  size: Joi.number().min(0),
  storageName: Joi.string().default(Date.now()),
  name: Joi.string().default(""),
  extension: Joi.string().default(""),
  //status: Joi.string().valid('Pending','Accepted',"Rejected","Canceled").default("Pending")
});

const validateFile = (file) => fileSchema.validate(file, { abortEarly: false });

module.exports = validateFile;
