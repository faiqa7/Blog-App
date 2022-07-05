var mongoose = require('mongoose');

let BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    image: String,
    description: String,
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);