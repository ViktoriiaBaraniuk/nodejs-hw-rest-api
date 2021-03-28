const Joi = require('joi');
const { HttpCode } = require('../../../helpers/constants')

const schemaCreateUser  = Joi.object({
      email: Joi.string()
       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

       password: Joi.string().min(5).required(),

})


  
const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
      const [{ message }] = error.details
      return next({
        status: HttpCode.BAD_REQUEST,
        message: `Field: ${message.replace(/'/g, '')}`
      })
    }
    next()
  }


module.exports.createUser = (req, _, next) => {
    return validate(schemaCreateUser, req.body, next)
}



