const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
        .min(6)
        .max(30)
        .required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref('password')
  })
  return schema.validate(data)
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

const newAuthorValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  }).unknown()
  return schema.validate(data)
}

const newBookValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.object().required(),
  }).unknown()
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.newAuthorValidation = newAuthorValidation;
module.exports.newBookValidation = newBookValidation;