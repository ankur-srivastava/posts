const passport = require('passport')
const passportJWT = require('passport-jwt')
const user = require('../schemas/user')

require('dotenv').config()

const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
    secretOrKey: process.env.jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("jwt")
}

module.exports = function() {
    const strategy = new Strategy(params, (payload, done) => {
        user.findById(payload.id, (err, user) => {
            if(err) {
                return done(new Error('User not found'), null)
            } else if(payload.expire<=Date.now()) {
                return done(new Error('Token expired'), null)
            } else {
                return done(null, user)
            }
        })
    })
    passport.use(strategy)
    return {
        initialize: function() {
            return passport.initialize()
        },
        authenticate: function() {
            return passport.authenticate("jwt", { session: false })
        }
    }
}
