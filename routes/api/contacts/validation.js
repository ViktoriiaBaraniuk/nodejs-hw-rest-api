const Joi = require('joi')

const schemaCreateContact  = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .required(),

    email: Joi.string()
       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    phone: Joi.string().length(14).required()

})

const schemaUpdateContact  = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .optional(),

    email: Joi.string()
       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),

    phone: Joi.string().length(14).optional()

})
  
const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
      const [{ message }] = error.details
      return next({
        status: 400,
        message: `Field:  ${message.replace(/"/g, '')}`
      })
    }
    next()
  }
  


module.exports.createContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
}
module.exports.updateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
}



