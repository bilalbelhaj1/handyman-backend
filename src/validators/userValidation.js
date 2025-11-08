const Joi = require('joi')


const userRegistrationSchema = Joi.object({
    firstName: Joi.string()
       .min(3)
       .max(30)
       .required(),
    lastName: Joi.string()
       .min(3)
       .max(30)
       .required(),
    phoneNumber: Joi.string()
       .min(10)
       .max(10)
       .required(),
    profession: Joi.string()
       .min(3)
       .max(30)
       .required()
})

const userLoginSchema = Joi.object({
    phoneNumber: Joi.string()
       .min(10)
       .max(10)
       .required(),
    password: Joi.string()
       .min(8)
       .required()
})