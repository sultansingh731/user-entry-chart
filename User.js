const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    isApprove: Boolean
})
module.exports = mongoose.model('User', UserSchema)