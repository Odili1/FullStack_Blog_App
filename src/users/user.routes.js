const router = require('express').Router();
const userService = require('./user.service');

router.post('/signup', async(req, res) => {
    const reqBody = req.body;

    const response = await userService.signup(reqBody);

    if (response.statusCode == 400) {
        res.render('/404', {message: response.message})
    }else if (response.statusCode == 403) {
        res.render('signup', {message: response.message})
    }else{
        res.cookie('jwt', response.token);
        res.redirect('/user/dasboard');
    }
})



router.get('/login', async(req, res) => {
    const reqBody = req.body;

    const response = await userService.login(reqBody);

    if (response.statusCode == 404){
        res.render('login', {message: response.message})
    }else if (response.statusCode == 400) {
        res.redirect('/404');
    }else{
        res.cookie('jwt', response.token)
        res.redirect('/user/dashboard')
    }
})

module.exports = router;