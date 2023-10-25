const express = require('express');
const db = require('./config/database');
const userRoutes = require('./users/user.routes');
const blogRoutes = require('./blogs/blog.routes');
require('dotenv').config();




// Connect to database
db.connectDB()

// Intialize express
const app = express();


// Express middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())


// Template Engine




// Route Rendering
app.get('/', blogRoutes);

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})



// Root Routes
app.use('/user', userRoutes)


// PORT
const PORT = 4050 || process.env.PORT;


// Start Server
app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
})