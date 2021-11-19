const Joi = require('joi')

module.exports.departmentValidation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  }
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}

module.exports.employeeValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    position: Joi.string().required()
  })
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  }
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = { ...value, department: req.body.department };
    next();
  }
}
