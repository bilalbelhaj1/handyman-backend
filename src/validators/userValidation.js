const Joi = require('joi')


const userRegisterValidation = Joi.object({
    Name: Joi.string()
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
    province : Joi.string()
       .max(100)
       .required(),
    city: Joi.string()
       .min(3)
       .max(50)
       .required()
})

const loginSchema = Joi.object({
    phone: Joi.string()
       .min(10)
       .max(10)
       .required(),
    password: Joi.string()
       .min(8)
       .max(30)
       .required()
})