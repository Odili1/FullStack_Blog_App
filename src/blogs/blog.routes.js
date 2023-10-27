const router = require('express').Router();
const blogService = require('./blog.service');
const cookieParser = require('cookie-parser');
const auth = require('./../auth/globalAuth')

router.use(cookieParser());

// router.get('/', )


// Protected Routes
// router.use(auth.cookieAuth)

router.post('/new-story/create', async (req, res) => {
    const user = res.locals.user;
    const reqBody = req.body;

    const response = await blogService.createBlog(user, reqBody);

    if (response.statusCode == 404){
        res.render('landPage', {message: response.message, blogs: response.blogs})
    } else if (response.statusCode == 400){
        res.redirect('/404')
    }else{
        res.json({
            blog: response.blogs
        })
        // res.render('dashboard', {message: response.message, blogs: response.blogs})
    }
})



// Display Personal Blogs on dashboard
router.get('/@:name', async (req, res) => {
    const user = res.locals.user;

    const response = await blogService.getPersonalBlogs(user);

    if (response.statusCode == 404){
        res.render('dashboard', {message: response.message, blogs: response.blogs})
    } else if (response.statusCode == 400){
        res.redirect('/404')
    }else{
        res.json({
            blog: response.blogs
        })
        // res.render('dashboard', {message: response.message, blogs: response.blogs})
    }
})


// Display draft blogs on dashboard
router.get('/@:name/drafts', (req, res) => {

})

module.exports = router;