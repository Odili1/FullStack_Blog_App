const {Schema, model} = require('mongoose');
const shortid = require('shortid');

const blogSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate()
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    tags: {
        type: String
    },
    read_count: Number,
    reading_time: String,
    user_id: {
        type: String,
        ref: "users"
    }
}, {timestamps: true});


const blogModel = model("blogs", blogSchema);

module.exports = blogModel
