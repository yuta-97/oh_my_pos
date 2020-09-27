const mongoose = require('mongoose');

// Define Schemes
const categorySchema = new mongoose.Schema({
  categoryname: { type: String, required: true, unique: true },
  options: [{
      optionname: { type: String, required: true},
      optionprice: { type: String, required: true }
  }]
});
console.log('Category Schema defind...');


// Create Model & Export
module.exports = mongoose.model('Category', categorySchema);