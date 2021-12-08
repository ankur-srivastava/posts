const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    used: Number,
    created: Date
  });

const Tag = mongoose.model('tags', tagsSchema);

module.exports = { Tag }
