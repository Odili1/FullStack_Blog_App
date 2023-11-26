const joi = require('joi');
const logger = require('../logs')

exports.validateSignup = async (req, res, next) => {
    try {
        const Schema = joi.object({
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required(),
        });

        await Schema.validateAsync(req.body, {abortEarly: true})

        next()
    } catch (error) {
        logger.info('(Validation Info) => Sign up validation failed')
        logger.error(`(Error info) => ${error}`)
        res.render('signup', {user: null, message: error.message})
    }
}


exports.validateLogin = async(req, res, next) => {
    try {
        const Schema = joi.object({
            email: joi.string().required(),
            password: joi.string().required(),
        })
        
        await Schema.validateAsync(req.body, {abortEarly: true})
        
        next()
    } catch (error) {
        logger.info('(Validation Info) => Log in validation failed')
        logger.error(`(Error info) => ${error}`)
        res.render('login', {user: null, message: error.message})
    }
}