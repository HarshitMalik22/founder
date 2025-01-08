const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    equity: { type: String, required: true },
    terms: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applicants: [{
        developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
    }]
});

module.exports = mongoose.model('Idea', IdeaSchema);