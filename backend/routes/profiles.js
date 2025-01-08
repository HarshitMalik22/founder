const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Ensure the Profile model is defined
const ProfileSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  image: String,
  skills: [String],
  experience: String,
});

const Profile = mongoose.model('Profile', ProfileSchema);

// Route to save a new profile
router.post('/', async (req, res) => {
  try {
    const profileData = req.body;
    
    // Log received data
    console.log('Received Profile Data:', profileData);

    // Validation check for required fields
    if (!profileData.name || !profileData.id) {
      return res.status(400).json({ message: 'Name and ID are required fields.' });
    }

    const newProfile = new Profile(profileData);
    await newProfile.save();

    // Log successful save
    console.log('New Profile Saved:', newProfile);

    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to retrieve all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();

    // Log the retrieved profiles
    console.log('Retrieved Profiles:', profiles);

    res.json(profiles);
  } catch (error) {
    console.error('Error retrieving profiles:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
