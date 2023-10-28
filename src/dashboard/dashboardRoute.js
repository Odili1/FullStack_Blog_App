const router = require('express').Router();
const blogService = require('../blogs/blog.service');
const cookieParser = require('cookie-parser');
const auth = require('../auth/globalAuth');

router.use(cookieParser());



// Protected Routes
router.use(auth.cookieAuth)


// Display Personal Blogs (published) on dashboard
router.get('/@:name', async (req, res) => {
    const user = res.locals.user;

    const response = await blogService.getPersonalBlogs(user);

    if (response.statusCode == 404){
        // console.log('bug', response.draftBlogs);
        res.render('dashboard', {message: response.message, pubBlogs: response.pubBlogs, draftBlogs: response.draftBlogs, user})
    } else if (response.statusCode == 400){
        res.redirect('/404')
    }else{
        // console.log(user);
        res.render('dashboard', {message: response.message, pubBlogs: response.pubBlogs, draftBlogs: response.draftBlogs, user})
    }
})

module.exports = router;