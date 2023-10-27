const userModel = require('../models/user.model');
const blogModel = require('./../models/blog.model');



exports.getBlogs = async () => {
    try {
        const blogs = await blogModel.find({state: 'published'});

        if (blogs.length == 0) {
            return {
                statusCode: 404,
                message: "No blogs yet",
                blogs: null
            }
        }


        if (blogs.length != 0) {
            return {
                statusCode: 200,
                message: null,
                blogs
            }
        }
    } catch (error) {
        return {
            statusCode: 400,
            message: 'Something went wrong while fecthing the blog'
        }
    }
}



exports.getPersonalBlogs = async (user) => {
    try {
        // Get blogs by user_id
        const myBlogs = await blogModel.find({user_id: "jfmzWszYT"});

        if (myBlogs.length == 0){
            return {
                statusCode: 404,
                message: 'No published blog yet',
                blogs: null,
                // user
            }
        }

        if (myBlogs != 0 ) {
            return {
                statusCode: 200,
                message: 'Blog fetched successfully',
                blogs: myBlogs,
                // user
            }
        }
    } catch (error) {
        return {
            statusCode: 400,
            message: 'Something went wrong while fecthing the blog'
        }
    }


}



exports.createBlog = async (user, reqBody) => {
    try {
        // function to calculate reading time
        function readingTime (text){
            const words = text.split(/\s+/);
            const wordCount = words.length;
            let averageWPM = 200
            let calcSec
            let calcMin = wordCount / averageWPM

            if (calcMin < 1){
                calcSec = Math.floor(calcMin * 60);
                return `${calcSec} seconds`
            }else {
                return `${calcMin} minutes`
            }
        }


        const newBlog = await userModel.create({
            title: reqBody.title,
            description: reqBody.description,
            body: reqBody.body,
            author: `${user.firstName} ${user.lastName}`,
            tags: [...reqBody.tags.split(',')],
            read_count: 0,
            reading_time: '',
            user_id: user._id
        })
    } catch (error) {
        return {
            statusCode: 400,
            message: 'Something went wrong. Click here to go home'
        }
    }
}


exports.updateBlog = () => {

}


exports.deleteBlog = () => {

}