const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function authToken(req, res, next) {
    console.log(req, 'req')
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    console.log(token, 'token')
    jwt.verify(token, process.env.access_token_admin, (err, user) => {
        if (err) return res.status(403).json({ msg: err.message })
        req.user = user
        console.log(req, 'req')
        next()
    });
};

module.exports = authToken;