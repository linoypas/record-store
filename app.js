const express = require('express');
const session = require('express-session');

const env = require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const app = express();
app.set("view engine", "ejs");
app.use(express.json())
app.use('/public', express.static('public'));

app.use(session({
    secret: 'your-secret-key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes/homePage'));
app.use('/', require('./routes/product'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/sortAndFilterProducts'));
app.use('/', require('./routes/users'));

app.listen(process.env.PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);

module.exports = app;