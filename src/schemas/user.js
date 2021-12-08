const passportLocalMongoose = require('passport-local-mongoose')
const mongoose = require('mongoose')
let validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: String,
    username: String,
    googleId: String,
    twitterId: String,
    username: String,
    numberOfPosts: Number,
    created: Date
  });

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('users', userSchema)
