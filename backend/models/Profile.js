const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  skills: { type: [String], default: [] },
  experience: { type: String, default: '' },
  preferredCompensation: { type: String, default: '' },
  portfolioURL: { type: String, default: '' },
  whatsappNumber: { type: String, default: '' }
});

module.exports = mongoose.model('Profile', ProfileSchema);
