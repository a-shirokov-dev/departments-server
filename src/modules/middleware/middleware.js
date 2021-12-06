const Joi = require("joi");

module.exports.departmentValidation = async (req, _res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(30).required(),
    description: Joi.string().allow(""),
  });

  validationBody(schema, req, next);
};

module.exports.employeeValidation = (req, _res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    position: Joi.string().required(),
  });

  validationBody(schema, req, next);
};

const validationBody = (schema, req, next) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error } = schema.validate(req.body, options);

  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    next();
  }
};
