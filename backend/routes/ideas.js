const express = require('express');
const Idea = require('../models/Idea');
const User = require('../models/User');
const router = express.Router();

// Create a new idea (Founder Only)
router.post('/', async (req, res) => {
    try {
        const { title, description, salary, equity, terms, postedBy } = req.body;
        const idea = new Idea({ title, description, salary, equity, terms, postedBy });
        await idea.save();

        res.status(201).json(idea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all ideas
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find().populate('postedBy', 'name email');
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Apply to an idea (Developer Only)
router.post('/:id/apply', async (req, res) => {
    try {
        const { developerId, message } = req.body;
        const idea = await Idea.findById(req.params.id);

        if (!idea) return res.status(404).json({ message: 'Idea not found' });

        idea.applicants.push({ developerId, message });
        await idea.save();

        res.json({ message: 'Application submitted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accept/Reject an applicant
router.put('/:id/applicants/:applicantId', async (req, res) => {
    try {
        const { status } = req.body;
        const idea = await Idea.findById(req.params.id);

        const applicant = idea.applicants.id(req.params.applicantId);
        if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

        applicant.status = status;
        await idea.save();

        res.json({ message: `Application ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
