const express = require('express');
const router = express.Router();
const Archive = require('../models/Archives');

// Get all archive categories
router.get('/', async (req, res) => {
  try {
    const archives = await Archive.find();
    res.json(archives);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching archives' });
  }
});

// Create a new archive category (for admin purposes)
router.post('/', async (req, res) => {
  const { category, description } = req.body;

  try {
    const newArchive = new Archive({ category, description });
    await newArchive.save();
    res.json(newArchive);
  } catch (err) {
    res.status(500).json({ error: 'Error creating archive category' });
  }
});

module.exports = router;
