const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  codeSnippet: String,
  answer: { type: String, required: true }
});

module.exports = mongoose.model('Question', questionSchema);
