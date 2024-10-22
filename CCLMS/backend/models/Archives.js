const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
  category: String,
  description: String,
});

module.exports = mongoose.model('Archive', archiveSchema);
