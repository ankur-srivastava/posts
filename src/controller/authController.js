const jwt = require('jwt-simple')
const user = require('../schemas/user')
require('dotenv').config()

function login(req, res) {
    user.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            console.error('Error when fetching user')
            res.json({
                error: err
            })
        } else {
            const payload = {
                id: user.id,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            }
            const token = jwt.encode(payload, process.env.jwtSecret)
            res.json({
                token
            })
        }
    })
}

function register(req, res) {
    user.register(
        new user({username: req.body.username, email: req.body.email}),
        req.body.password, (err, user) => {
            if(err) {
                console.error('Error when fetching user')
                res.json({
                    error: err
                })
            } else {
                res.json({
                    message: 'User Created'
                })
            }
        }
        )
}

function googleLogin(req, res) {
    console.log("In googleLogin")
    console.log(req)
    const payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
    }
    const token = jwt.encode(payload, process.env.jwtSecret)
    res.json({
        token
    })
}

module.exports = {login, register, googleLogin}
