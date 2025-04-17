const express = require('express');
const { aiFeedback } = require('../Controllers/aiResponse');
const router = express.Router();


router.get('/', (req, res) => {
    res.send({ msg: "Hello welcome to interviewer rating api. This is first version of the api. We will notify you when the api v2 is ready" });
})

router.post('/gen', async (req, res) => {
    const { candidateName, candidateExperience, interviewTranscript, skillsToRate, mandetorySkills } = req.body;
    const CandidateData = { candidateName, candidateExperience, interviewTranscript, skillsToRate, mandetorySkills };
    const aiResponse = await aiFeedback(CandidateData);
    console.log(aiResponse);
    res.json(aiResponse);
});





module.exports = router;