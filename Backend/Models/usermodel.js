const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: String,
    email:String
     
})
module.exports = mongoose.model('users', blogSchema)