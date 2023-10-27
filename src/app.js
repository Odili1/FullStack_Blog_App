const express = require('express');
const path = require('path')
const db = require('./config/database');
const userRoutes = require('./users/user.routes');
const blogRoutes = require('./blogs/blog.routes');
const blogService = require('./blogs/blog.service')
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
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));




// Route Rendering
app.get('/', async (req, res) => {
    const response = await blogService.getBlogs();

    if (response.statusCode == 404){
        res.render('landPage', {message: response.message, blogs: response.blogs})
    } else if (response.statusCode == 400){
        res.redirect('/404')
    }else{
        // res.send(response.blogs)
        res.render('landPage', {message: response.message, blogs: response.blogs})
    }
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/new-story', (req, res) => {
    res.render('newStory')
})



// Root Routes
app.use('/user', userRoutes)
app.use('/dashboard', blogRoutes)

// PORT
const PORT = 4050 || process.env.PORT;


// Start Server
app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
})