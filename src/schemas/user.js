const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    twitterId: String,
    username: String,
    numberOfPosts: Number,
    created: Date
  });

const User = mongoose.model('users', userSchema);

module.exports = { User }
