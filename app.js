const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import Route
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

// Import Scraping
const scraping = require('./controllers/scraping');

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/UrbanhireJobs';


app.use(bodyParser.json());

// Allow Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Use Route
app.use('/api/auth/', authRoute);
app.use('/api/user/', userRoute);

// Error Handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


// Connect database and run server using port 8080
mongoose
    .connect(
        MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
    .then(result => {
        console.log('Connected');
        app.listen(8080, scraping.getjobs);
    })
    .catch(err => {
        console.log(err);
    });
