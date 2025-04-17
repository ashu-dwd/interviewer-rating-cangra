const express = require('express');
const aiRoute = require('./Routes/aiRoute');

const app = express();

const PORT = 3000;

//middlewares for forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middlewares of routing
app.use(express.static('public'));
app.use('/api/v1/', aiRoute)

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});
app.get('/api-docs', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})


app.listen(PORT, () => {
    console.log(`App is listening at port: ${PORT}`)
})