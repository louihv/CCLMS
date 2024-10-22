const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as necessary

// Middleware to verify token
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    jwt.verify(token.split(' ')[1], 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};

// Route to get user profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile data' });
    }
});

router.put('/profile', authenticate, async (req, res) => {
  try {
      const { firstName, middleName, lastName, email, address, contact, house } = req.body;
      const updatedProfile = await User.findByIdAndUpdate(req.userId, {
          firstName,
          middleName,
          lastName,
          email,
          address,
          contact,
          house
      }, { new: true }); // Return the updated document
      res.status(200).json(updatedProfile);
  } catch (error) {
      res.status(500).json({ message: 'Error updating profile' });
  }
});


module.exports = router;
