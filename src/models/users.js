const mongoose = require('mongoose')

const { Schema } = mongoose
const users = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    phone: {
        type: {
            String,
            required: true
        },
    },
    email: {
        type: {
            String,
            required: true,
            unique: true,
        },
    },
})

module.exports = mongoose.model('users', users)