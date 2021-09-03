const jwt = require('jsonwebtoken')
var config = require('../config/secret')

function verification()  {
    return (req, rest, next) => {

        var role = req.body.role;
        var tokenWithBearer = req.headers.authorization
        if(tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1]

            jwt.verify(token, config.secret, (err, decode) => {
                if(err) {
                    return rest.status(401).send({auth: false, message: 'Token tidak terdaftar'})
                } else {
                    if(role == 1) {
                        req.auth = decode
                        next()
                    } else {
                        return rest.status(401).send({auth: false, message: 'Gagal mengotorisasi role anda'})
                    }
                }
            })
        } else {
            return rest.status(401).send({auth: false, message: 'Token tidak terdaftar'})
        }
    }
}

module.exports = verification