const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true }, // New field for article content
});

module.exports = mongoose.model('Article', ArticleSchema);
