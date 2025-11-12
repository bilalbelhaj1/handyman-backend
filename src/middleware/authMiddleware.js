const jwt = require("jsonwebtoken")

const authentification = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(403).json({
            message:"Not authenticated"
        })
    }

    try {
        const payload = jwt.verify(token, process.env.jwt_SECRET_KEY);
        req.user = payload;
        next()
    } catch (err) {
        console.log(err)
        next()
    }
}

module.exports = { authentification }