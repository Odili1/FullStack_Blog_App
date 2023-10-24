const userModel = require('./../models/user.model');


exports.signup = async(reqBody) => {
    try {
        // check if userEmail exist
        const existingUser = await userModel.find({email: reqBody.email});

        if (existingUser) {
            return {
                status: 403,
                message: 'User with this email already exists',
                succes: false
            }
        }

    } catch (error) {
        return {
            status: 400,
            message: 'Something went wrong. Please go back home',
            success: false
        }
    }
}


exports.login = () => {

}