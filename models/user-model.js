const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    googleId: String
});

const UserModel = mongoose.model('user', userSchema); // MongoDB plurarizes the name of the model 

module.exports = UserModel;


