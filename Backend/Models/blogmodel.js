const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description:String,
    imageUrl:String ,
    content:String 
})
module.exports = mongoose.model('apps', blogSchema)