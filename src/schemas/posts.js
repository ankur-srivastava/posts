const mongoose  = require('mongoose')

const commentsSchema = new mongoose.Schema({
    body: String,
    created: Date
});

const postsSchema = new mongoose.Schema({
    title: String,
    body: String,
    created: Date,
    tags: [String],
    comments: [commentsSchema],
    user: mongoose.Schema.Types.ObjectId,
    topic: mongoose.Schema.Types.ObjectId,
    upvotes: Number,
    downvotes: Number,
    views: Number
});

const Post = mongoose.model('posts', postsSchema);

module.exports = { Post }
