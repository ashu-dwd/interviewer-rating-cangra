const express = require('express');
const { aiFeedback } = require('../Controllers/aiResponse');
const router = express.Router();

// Input validation middleware
const validateInput = (req, res, next) => {
    const { candidateName, candidateExperience, interviewTranscript, skillsToRate, mandetorySkills } = req.body;

    if (!candidateName || !interviewTranscript) {
        return res.status(400).json({ error: "Candidate name and interview transcript are required" });
    }

    // Add more validation as needed
    next();
};

router.get('/', (req, res) => {
    res.send({
        msg: "Hello welcome to interviewer rating api. This is first version of the api. We will notify you when the api v2 is ready",
        status: 'operational',
        version: '1.0'
    });
});

router.post('/gen', validateInput, async (req, res) => {
    try {
        const { candidateName, candidateExperience, interviewTranscript, skillsToRate, mandetorySkills } = req.body;
        const CandidateData = { candidateName, candidateExperience, interviewTranscript, skillsToRate, mandetorySkills };

        const aiResponse = await aiFeedback(CandidateData);
        console.log('AI Response:', aiResponse);
        // Ensure consistent response format
        res.json({
            success: true,
            data: aiResponse,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in /gen endpoint:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: error.message
        });
    }
});

module.exports = router;