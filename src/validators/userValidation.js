const Joi = require('joi')


const userRegisterValidation = Joi.object({
    Name: Joi.string()
       .label("First Name")
       .min(3)
       .max(30)
       .required(),
    lastName: Joi.string()
       .label("Last Name")
       .min(3)
       .max(30)
       .required(),
    phoneNumber: Joi.string()
       .label("Phone Number")
       .min(10)
       .max(10)
       .required(),
    province : Joi.string()
       .label("Province")
       .max(100)
       .required(),
    city: Joi.string()
       .label("City")
       .min(3)
       .max(50)
       .required()
})

const loginSchema = Joi.object({
    phone: Joi.string()
       .label("Phone Number")
       .min(10)
       .max(10)
       .required(),
    password: Joi.string()
       .label("Password")
       .min(8)
       .max(30)
       .required()
})