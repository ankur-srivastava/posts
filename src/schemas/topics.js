const mongoose = require('mongoose')

const topicsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    created: Date
  });

const Topic = mongoose.model('topics', topicsSchema);

module.exports = { topicsSchema, Topic }
