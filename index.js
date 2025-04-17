const express = require('express');
const path = require('path');
const aiRoute = require('./Routes/aiRoute');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (e.g., CSS, JS, images)
app.use(express.static('Public'));

// Routes
app.use('/api/v1/', aiRoute);

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
