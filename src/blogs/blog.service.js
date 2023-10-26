const blogModel = require('./../models/blog.model');



exports.getBlogs = async () => {
    try {
        const blogs = await blogModel.find({});

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

        if (myBlogs != 0) {
            return {
                statusCode: 200,
                message: 'No published blog yet',
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



exports.createBlog = () => {

}


exports.updateBlog = () => {

}


exports.deleteBlog = () => {

}