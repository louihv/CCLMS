const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Enroll user in subjects
router.put('/:id', async (req, res) => {
  const { subjects } = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { enrolledSubjects: subjects } }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error enrolling in subjects' });
  }
});

module.exports = router;
