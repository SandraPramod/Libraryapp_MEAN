// Accessing Mongoose Package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/library');

// Schema Definition
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String
});

// Model Creation
var signupData = mongoose.model('signupdata', signupSchema);

module.exports = signupData;