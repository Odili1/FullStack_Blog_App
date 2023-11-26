const userModel = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const logger = require('../logs')
require('dotenv').config();


exports.signup = async(reqBody) => {
    try {
        logger.info('(Function info) => Sign Up function')
        const {first_name, last_name, email, password} = reqBody;
        // check if userEmail exist
        const existingUser = await userModel.findOne({email: email});

        if (existingUser) {
            logger.info('(Function info) => User with email exists')
            return {
                statusCode: 403,
                message: 'User with this email already exists',
                succes: false
            }
        }
        
        const newUser = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })
        
        console.log(newUser);
        
        if (!newUser){
            logger.info('(Function info) => something went wrong')
            return {
                statusCode: 400,
                message: 'Something went wrong while creating an account. Please go back home',
                success: false
            }
        }
        
        const jwtPayload = {
            _id: newUser._id, 
            email: newUser.email, 
            firstName: newUser.first_name, lastName: newUser.last_name
        }
        
        const token = jwt.sign({...jwtPayload}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        return {
            statusCode: 201,
            message: 'User created successfully',
            newUser,
            token
        }
        
    } catch (error) {
        logger.error(`(Error info) => ${error}`)
        return {
            statusCode: 400,
            message: 'Something went wrong. Please go back home',
            success: false
        }
    }
}


exports.login = async (reqBody) => {
    try {
        logger.info('(Function info) => Log in function')
        const {email, password} = reqBody;
        
        const existingUser = await userModel.findOne({email: email})
        if (!existingUser){
            logger.info('(Function info) => Invalid login details')
            return {
                statusCode: 404,
                message: 'Invalid login details',
                success: false
            }
        }
        
        const validPassword = await existingUser.isValidPassword(password);
        
        if (!validPassword){
            logger.info('(Function info) => Invalid Username or Password')
            return {
                statusCode: 404,
                message: 'Invalid Userame or Password',
                success: false
            }
        }

        const jwtPayload = {
            _id: existingUser._id, 
            email: existingUser.email, 
            firstName: existingUser.first_name, lastName: existingUser.last_name
        }

        const token = jwt.sign({...jwtPayload}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return {
            statusCode: 200,
            message: 'Login successful',
            succes: true,
            existingUser,
            token
        }
    } catch (error) {
        logger.error(`(Error info) => ${error}`)
        return {
            statusCode: 400,
            message: 'Something went wrong. Please go back home',
            success: false
        }
    }
}