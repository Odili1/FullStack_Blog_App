const express = require('express');
const db = require('./config/database')
require('dotenv').config();




// Connect to database
// db.connectDB()

// Intialize express
const app = express();


// Express middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

// Root Routes
app.get('/', )


// PORT
const PORT = 4050 || process.env.PORT;


// Start Server
app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
})