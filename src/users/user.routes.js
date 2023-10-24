const router = require('express').Router();
const userService = require('./user.service');

router.get('/signup', async(req, res) => {
    const reqBody = req.body;

    const response = await userService.signup(reqBody);
})

router.get('/signup', async(req, res) => {
    const reqBody = req.body;

    const response = await userService.login();
})