const router = require('express').Router();
const blogService = require('./blog.service');
const cookieParser = require('cookie-parser');

router.use(cookieParser())

router.get('/', async (req, res) => {
    const response = await blogService();

    // if (resp)
})



module.exports = router;