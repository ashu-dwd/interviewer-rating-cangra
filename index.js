const express = require('express');
const path = require('path');
const fs = require('fs');
const aiRoute = require('./Routes/aiRoute');
const cors = require('cors');
const main = require('./aiHandler');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

// Serve static files (e.g., CSS, JS, images)
app.use(express.static('Public'));

// Routes
app.use('/api/v1/', aiRoute);

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/', async (req, res) => {
    const { candidateName, candidateExperience, interviewTranscript, skillsToRate, mandetorySkills } = req.body;
    const CandidateData = { candidateName, candidateExperience, interviewTranscript, skillsToRate, mandetorySkills };
    const result = await main(CandidateData);
    const responseCleaner = (response) => {
        return response.replace(/^json\s*/i, '')
            .replace(/^```json\s*/i, '')
            .replace(/```$/g, '')
            .trim();
    };
    res.json(JSON.parse(responseCleaner(result)));
})

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
