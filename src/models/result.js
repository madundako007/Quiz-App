const mongoose = require('mongoose')

const { Schema } = mongoose
const Result = new Schema({

    email: {
        type: String,
        required: true
    },
    correctAnswer: Number,
    count: Number
})

module.exports = mongoose.model('Result', Result)