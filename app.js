require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const aiRoute = require('./Routes/aiRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.resolve(__dirname, 'Public')));

// Routes
app.use('/api/v1', aiRoute);

// Index Route
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'Public', 'index.html'));
});

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
