import { AppError } from "../utils/AppError"

const validate = (schema) => {
    return (req, _, next) => {
        const { error, value } = schema.validate(req.body)
        if(error) return next(new AppError(error.details[0].message, 400))
        req.body = value;
        next()
    }
}

module.exports = { validate }