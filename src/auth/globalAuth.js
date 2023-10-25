const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.cookieAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            res.render('landPage', {user: null, status: 401, message: 'Signup or login to publish a blog'})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            res.render('landPage', {user: null, status: 401, message: 'Signup or login to publish a blog'})
        }

        res.locals.user = decodedToken;

        next()
    } catch (error) {
        res.render('landPage', {user: null, status: 401, message: 'Login or Signup to access your dashboard'})
    }
}