const express = require('express');
const session = require('express-session');
const StoreLocation = require('./models/storeLocation');  
const env = require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use('/public', express.static('public'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes/homePage'));
app.use('/', require('./routes/orders'));
app.use('/', require('./routes/product'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/sortAndFilterProducts'));
app.use('/', require('./routes/graphs'))
app.use('/', require('./routes/initDb'))
app.use('/', require('./routes/users'))
app.use('/', require('./routes/storeLocation'));

app.get('/maps', async (req, res) => {
    try {
        console.log("Fetching store locations...");
        const storeLocations = await StoreLocation.find();  // Query DB
        console.log("Fetched data:", storeLocations);  // Log the result
        res.render('maps', { storeLocations });  // Pass data to EJS template
    } catch (err) {
        console.error("Error fetching store locations:", err.message);  // Error handling
        res.status(500).json({ message: err.message });
    }
});

app.listen(process.env.PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ process.env.PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);

module.exports = app;