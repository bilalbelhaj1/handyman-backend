const Joi = require('joi')


const adminLoginSchema = Joi.object({
    email: Joi.string()
       .email({ tlds: {allow: false} })
       .required()
       .messages({
        'string.empty': "email cannot be empty",
        'string.email': "Invalid email address",
        'any.required': "Email is required"
       }),
    
    password: Joi.string()
       .min(8)
       .required()
       .messages({
        'any.required': "Password is required",
        'string.min': "password must be more than 8 characters"
       })
})