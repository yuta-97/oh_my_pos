const mongoose = require('mongoose');

// Define Schemes
const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tablenum: { type: String, required: true },
  discount: [{
    disname: { type: String, required: true },
    disrate: { type: Number, required: true }
  }]
});
console.log('Store_setting Schema defind...');


// Create Model & Export
module.exports = mongoose.model('Store', storeSchema);

















