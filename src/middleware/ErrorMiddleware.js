
const errorHandler = async (err, req, res, next) => {
    if(err.isOperational) return res.status(err.status).json({
        message: err.message
    })

    return res.status(500).json({
        message: "Internal server error"
    })
}

module.exports = { errorHandler }