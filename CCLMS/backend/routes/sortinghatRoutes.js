// In your Express backend
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User is your Mongoose model

// Route to update the user's house
router.post('/updateHouse', async (req, res) => {
  const { house, userId } = req.body; // Assuming you pass the user's house and userId in the body

  try {
    // Find the user by their ID and update their house
    const user = await User.findByIdAndUpdate(userId, { house }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'House updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating house', error });
  }
});

module.exports = router;
