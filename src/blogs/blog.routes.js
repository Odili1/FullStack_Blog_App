const router = require('express').Router();
const blogService = require('./blog.service');
const cookieParser = require('cookie-parser');
const auth = require('./../auth/globalAuth')

router.use(cookieParser());

// router.get('/', )


// Protected Routes
router.use(auth.cookieAuth)



// Write a new story
router.post('/new-story', async (req, res) => {
    const user = res.locals.user;
    const reqBody = req.body;

    console.log('owner', user);
    console.log('blog', reqBody);

    const response = await blogService.createBlog(user, reqBody);

    if (response.statusCode == 404){
        res.render('landPage', {message: response.message, blogs: response.blogs})
    } else if (response.statusCode == 400){
        res.json({
            reqBody
        })
        // res.redirect('/404')
    }else{
        // res.json({
        //     blog: response.blogs
        // })
        res.redirect(`/dashboard/@ ${user.email.split('@')[0]}`)
    }
})




// Update blogs ------------------


// Delete Blogs ------------------

module.exports = router;