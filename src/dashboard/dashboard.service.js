const blogModel = require('../models/blog.model');
const logger = require('../logs')


exports.getDraftPost = async (blog_id) => {
    try {
        logger.info('(Function info) => Draft Post function')
        // Get blogs by user_id
        let draftBlog = await blogModel.findOne({_id: blog_id});
        
        
        // Format Date
        let date = `${draftBlog.createdAt}`.split(/(?<=\d{4})\s/)[0].split(' ').slice(1);
        date.splice(1,1,`${date[1]},`);
        draftBlog.time_saved = date.join(' ');
        
        
        if (!draftBlog){
            logger.info('(Function info) => something went wrong')
            return {
                statusCode: 404,
                message: 'Something went wrong while fecthing the post',
            }
        }
        
        return {
            statusCode: 200,
            message: 'successful',
            draftBlog
        }
    } catch (error) {
        logger.error(`(Error info) => DraftPost: ${error}`)
        return {
            statusCode: 400,
            message: 'Something went wrong while fecthing the post',
        }
    }
}


// Service to Publish Post 
exports.publishPost = async(blog_id) => {
    try {
        logger.info('(Function info) => Publish Post function')
        // Get post to publish
        let pubBlog = await blogModel.findOneAndUpdate({_id: blog_id}, {
            state: 'published',
            time_published: Date()
        });
        
        if (!pubBlog) {
            logger.info('(Function info) => something went wrong')
            return {
                statusCode: 404,
                message: 'Something went wrong while publishing. Try again leter ',
            }
        }
        
        
        
        return {
            statusCode: 200,
            message: 'successful',
            pubBlog
        }
    } catch (error) {
        logger.error(`(Error info) => publishPost: ${error}`)
        return {
            statusCode: 400,
            message: 'Something went wrong while publishing. Try again later',
        }
    }
}


// Service to View Published Post
exports.viewPublishedPost = async(blog_id) => {
    try {
        logger.info('(Function info) => Publish Post function')
        // Get blogs by user_id
        let pubBlog = await blogModel.findOne({_id: blog_id});
        
        
        // Format Date
        let date = `${pubBlog.time_published}`.split(/(?<=\d{4})\s/)[0].split(' ').slice(1);
        date.splice(1,1,`${date[1]},`);
        pubBlog.published_time = date.join(' ');
        
        
        if (!pubBlog){
            logger.info('(Function info) => something went wrong')
            return {
                statusCode: 404,
                message: 'Something went wrong while fecthing the post',
            }
        }

        return {
            statusCode: 200,
            message: 'successful',
            pubBlog
        }
    } catch (error) {
        logger.error(`(Error info) => viewPublishedPost: ${error}`)
        return {
            statusCode: 400,
            message: 'Something went wrong while publishing. Try again later',
        }
    }
}