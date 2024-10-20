const express = require('express');
const Course = require('../models/Course');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get all courses
router.get('/', authenticate, async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new course
router.post('/', authenticate, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      createdBy: req.user.id,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
