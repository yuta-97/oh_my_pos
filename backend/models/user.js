const mongoose = require('mongoose');

// Define Schemes
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  pw: { type: String, required: true },
  email: { type: String, default: false }
});
console.log('User Schema defind...');

// var User = mongoose.model('User', userSchema, 'users');

// console.log('User Model defined... ');


// Create Model & Export
module.exports = mongoose.model('User', userSchema);