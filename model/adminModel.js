const mongoose = require('mongoose')


// Creating a model for admin registration
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },
    email:{
        type: String,
        required: true,
        min: 4,
        max: 10
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 10
    }
})

module.exports = mongoose.model('admin', adminSchema)