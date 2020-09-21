const mongoose = require('mongoose');

// Define Schemes
const discountSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  rate: { type: String, required: true }
});
console.log('Discount Schema defind...');


// Create Model & Export
module.exports = mongoose.model('discount', discountSchema);