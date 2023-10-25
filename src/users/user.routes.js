const router = require('express').Router();
const userService = require('./user.service');
const cookieParser = require('cookie-parser');

router.use(cookieParser())

router.post('/signup', async(req, res) => {
    const reqBody = req.body;

    const response = await userService.signup(reqBody);

    if (response.statusCode == 400) {
        res.render('/404', {message: response.message})
    }else if (response.statusCode == 403) {
        res.render('signup', {message: response.message})
    }else{
        res.cookie('jwt', response.token);
        res.status(200).json({
            ...response
        })
        // res.redirect('/user/dasboard');
    }
})



router.post('/login', async(req, res) => {
    const reqBody = req.body;

    const response = await userService.login(reqBody);

    if (response.statusCode == 404){
        res.render('login', {message: response.message})
    }else if (response.statusCode == 400) {
        res.redirect('/404');
    }else{
        res.cookie('jwt', response.token)
        res.status(200).json({
            ...response,
            cookie: req.cookies.jwt
        })
        // res.redirect('/user/dashboard')
    }
})

module.exports = router;