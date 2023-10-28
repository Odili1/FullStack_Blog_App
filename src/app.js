const express = require('express');
const path = require('path')
const db = require('./config/database');
const userRoutes = require('./users/user.routes');
const blogRoutes = require('./blogs/blog.routes');
const blogService = require('./blogs/blog.service');
const dashboardRoute = require('./dashboard/dashboardRoute')
const auth = require('./auth/globalAuth');
const cookieParser = require('cookie-parser');

require('dotenv').config();




// Connect to database
db.connectDB()

// Intialize express
const app = express();


// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));


// Express middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser());



// Route Rendering
app.get('/', async (req, res) => {
    // Get blogs to display
    const {blogs, message, statusCode} = await blogService.getBlogs();

    // Login Error
    const error = req.cookies.error;
    const user = req.cookies.user

    if (statusCode == 404){
        // console.log(response);
        res.render('landPage', {error, message, blogs, user: user ? user : false})
    } else if (statusCode == 400){
        res.redirect('/404')
    }else{
        // console.log(blogs);
        res.clearCookie('error')
        res.clearCookie('user')
        // console.log('user details', req.cookies.user);
        // console.log('error', req.cookies.error);
        res.render('landPage', {error, message, blogs: blogs, user: user ? user.split('@')[0] : false})
    }
});

app.get('/login', (req, res) => {
    res.render('login', {user: (res.locals.user || null), message: null})
})

app.get('/signup', (req, res) => {
    res.render('signup', {user: (res.locals.user || null), message: null})
})

app.get('/logout', (req, res) => {
    res.clearCookie('jwt')
    res.clearCookie('user')

    res.redirect('/')
})


// Protected Routes
// Create new blog
app.get('/new-story', auth.cookieAuth, (req, res) => {
    res.render('newStory', )
})

// Profile




// Root Routes
app.use('/user', userRoutes)
app.use('/dashboard', dashboardRoute)
// app.use('/dashboard', blogRoutes)
app.use('/post', blogRoutes)


// catch Errors
app.use("*", (req, res) => {
    console.log('nothing');
  res.status(404).render("404", {user: (res.locals.user || null)})
});


// PORT
const PORT = 4050 || process.env.PORT;


// Start Server
app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
})