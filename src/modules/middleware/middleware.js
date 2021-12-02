const Joi = require("joi");

module.exports.departmentValidation = async (req, _res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(30).required(),
    description: Joi.string(),
  });
  validationBody(schema, req, next, "Department");
};

module.exports.employeeValidation = (req, _res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    position: Joi.string().required(),
  });
  validationBody(schema, req, next, "Employee");
};

const validationBody = (schema, req, next, entity) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
  } else {
    req.body =
      entity === "Department"
        ? value
        : { ...value, department: req.body.department };
    next();
  }
};
