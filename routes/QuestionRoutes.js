const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  const { category, title, codeSnippet, answer } = req.body;
  try {
    const newQuestion = new Question({ category, title, codeSnippet, answer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get questions by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
      const questions = await Question.find({ category });
      res.json(questions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { category, title, codeSnippet, answer } = req.body;
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(
        id,
        { category, title, codeSnippet, answer },
        { new: true, runValidators: true }
      );
      if (!updatedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
      res.json(updatedQuestion);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
module.exports = router;
