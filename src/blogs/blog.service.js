// const userModel = require('../models/user.model');
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
            message: 'Something went wrong while fecthing the blog',
            blogs: null
        }
    }
}



exports.getPersonalBlogs = async (user) => {
    try {
        // Get blogs by user_id
        const myBlogs = await blogModel.find({user_id: user._id});

        
        if (myBlogs.length == 0){
            return {
                statusCode: 404,
                message: 'No published or saved blog yet',
                pubBlogs: null,
                // user
            }
        }
        
        // Published Blogs
        const pubBlogs = myBlogs.filter((blog) => blog.state == 'published');
        // console.log('timestmp', pubBlogs.createdAt);
        
        // Draft Blogs
        const draftBlogs = myBlogs.filter((blog) => blog.state == 'draft')
        
            // console.log( 'timestamp', draftBlogs[1].createdAt.split('-'));
        

        if (pubBlogs.length == 0 || draftBlogs.length == 0) {
            return {
                statusCode: 404,
                message: 'No Blogs here',
                pubBlogs: (pubBlogs.length == 0 ? false : pubBlogs),
                draftBlogs: (draftBlogs.length == 0 ? false : draftBlogs)
            }
        }
        
        if (pubBlogs != 0 && draftBlogs != 0) {
            return {
                statusCode: 200,
                message: 'Blog fetched successfully',
                pubBlogs,
                draftBlogs
            }
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            message: 'Something went wrong while fecthing the blog',
            pubBlogs: (pubBlogs.length == 0 ? false : pubBlogs),
            draftBlogs: (draftBlogs.length == 0 ? false : draftBlogs)
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
                return `${calcSec} sec`
            }else {
                return `${calcMin} min`
            }
        }

        console.log(user);
        console.log({tags: [...reqBody.tags.split(',')]});

        const newBlog = await blogModel.create({
            title: reqBody.title,
            description: reqBody.description,
            body: reqBody.body,
            author: `${user.firstName} ${user.lastName}`,
            tags: [...reqBody.tags.split(',')],
            read_count: 0,
            reading_time: readingTime(reqBody.body),
            user_id: user._id
        });

        if (!newBlog) {
            return {
                statusCode: 404,
                message: 'Something went wrong while creating the blog. Click here to go home',
                blogs: null
            }
        }
        console.log({newBlog});
        return {
            statusCode: 200,
            message: "Blog created successfully",
            blogs: newBlog
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            message: 'Something went wrong. Click here to go home',
            blogs: null
        }
    }
}



exports.updateBlog = () => {

}


exports.deleteBlog = () => {

}