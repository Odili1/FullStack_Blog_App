const {Schema, model} = require('mongoose');
const shortid = require('shortid');

const userSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate()
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    }

}, {timestamps: true});


const userModel = model('users', userSchema);

module.exports = userModel;