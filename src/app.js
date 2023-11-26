// Modules
const express = require('express');
const path = require('path')
const db = require('./config/database');
const userRoutes = require('./users/user.routes');
const blogRoutes = require('./blogs/blog.routes');
const blogService = require('./blogs/blog.service');
const dashboardRoute = require('./dashboard/dashboard.route')
const auth = require('./auth/globalAuth');
const cookieParser = require('cookie-parser');
const logger = require('./logs')


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
// Landing Page
app.get('/', async (req, res) => {
    // Get blogs to display
    const {blogs, message, statusCode} = await blogService.getBlogs();
    
    // Login Error
    const error = req.cookies.error;
    const user =  req.cookies.user

    if (statusCode == 404){
        
        res.render('landPage', {error, message, blogs, user: user ? user : false})
    } else if (statusCode == 400){
        res.redirect('/404')
    }else{
        res.clearCookie('error')
        res.clearCookie('user')
        logger.info('(Home Route) => User Details: ', req.cookies.user)
        
        res.render('landPage', {error, message, blogs: blogs, user: user ? user.split('@')[0] : false})
    }
});


// Search Functionality
app.get('/search', async (req, res) => {
    const query = req.query.q;
    const user = req.cookies.user

    // If there's no query, redirect to home page with all values
    if (!query) {
        res.redirect('back')
    }

    const response = await blogService.searchBlogs(query);

    if (response.statusCode == 404){
        
        res.render('noBlogs', {error: response.message, blogs: response.matchedBlogs, user: user ? user.split('@')[0] : false})
    } else if (response.statusCode == 400){
        res.render('noBlogs', {error: response.message, blogs: response.matchedBlogs, user: user ? user.split('@')[0] : false})
    }else{
        res.render('landpage', {error: null, blogs: response.matchedBlogs, user: user ? user.split('@')[0] : false})
    }
})


// Route View Individual Public Post
app.get('/@:authorEmail/:title', async (req, res) => {
    // const authorEmail = req.params.authorEmail;
    const title_blog_id = req.params.title;
    const user =  req.cookies.user

    const response = await blogService.viewPublicPost(title_blog_id);

    if (response.statusCode == 404){
        // console.log(response);
        res.render('landPage', {error: response.message})
    } else if (response.statusCode == 400){
        res.redirect('/404')
    }else{

        res.render('publicBlogs', {error: response.message, blog: response.blog, user: user ? user.split('@')[0] : false})
    }
})



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


// Protected Route
// Create new blog
app.get('/new-story', auth.cookieAuth, (req, res) => {
    res.render('newStory', )
})





// Root Routes
app.use('/user', userRoutes)
app.use('/dashboard', dashboardRoute)
app.use('/posts', blogRoutes)


// Invlaid Route
app.use("*", (req, res) => {
    logger.info('(Invalid Route) => Error in route')
  res.status(404).render("404", {user: (res.locals.user || null)})
});


// Global Error Handler
app.use((err, req, res, next) => {
    logger.error(`(Global Error Handler) => ${err.stack}`)
    res.status(500).json({
        data: null,
        error: 'Server Error'
    })
})


// PORT
const PORT = 4050 || process.env.PORT;


// Start Server
app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
})