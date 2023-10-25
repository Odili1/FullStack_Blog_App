const userModel = require('./../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async(reqBody) => {
    try {
        const {first_name, last_name, email, password} = reqBody;
        // check if userEmail exist
        const existingUser = await userModel.findOne({email: email});

        if (existingUser) {
            return {
                statusCode: 403,
                message: 'User with this email already exists',
                succes: false
            }
        }

        const newUser = userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        })

        if (!newUser){
            return {
                statusCode: 400,
                message: 'Something went wrong while creating an account. Please go back home',
                success: false
            }
        }

        const token = jwt.sign({_id: newUser._id, email: email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return {
            statusCode: 201,
            message: 'User created successfully',
            newUser,
            token
        }

    } catch (error) {
        return {
            statusCode: 400,
            message: 'Something went wrong. Please go back home',
            success: false
        }
    }
}


exports.login = async (reqBody) => {
    try {
        const {email, password} = reqBody;

        const existingUser = await userModel.findOne({email: email})
        if (!existingUser){
            return {
                statusCode: 404,
                message: 'Invalid login details',
                success: false
            }
        }

        const validPassword = await userModel.isValidPassword(password);

        if (!validPassword){
            return {
                statusCode: 404,
                message: 'Invalid Userame or Password',
                success: false
            }
        }

        const token = jwt.sign({_id: existingUser._id, email: existingUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        return {
            statusCode: 200,
            message: 'Login successful',
            succes: true,
            existingUser,
            token
        }
    } catch (error) {
        return {
            statusCode: 400,
            message: 'Something went wrong. Please go back home',
            success: false
        }
    }
}