const mongoose = require('mongoose');

// Define Schemes
const menuSchema = new mongoose.Schema({
  menu: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String, default: false }
});
console.log('Menu Schema defind...');


// Create Model & Export
module.exports = mongoose.model('Menu', menuSchema);