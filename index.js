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
    res.send('Hello world!');
});
app.get('/api-docs', (req, res) => {
    res.send('index.html')
})


app.listen(PORT, () => {
    console.log(`App is listening at port: ${PORT}`)
})