const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports.jwtVerify = (req, res, next) => {
    token = req.headers['access-token'];
    jwt.verify(token, config.jwtKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'invalid token'
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
};