const mongoose = require('mongoose');

// Define Schemes
const shopSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tableNum: { type: String, required: true },
  discount_id: { type: mongoose.Schema.Types.ObjectId, ref: discount },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref : menu }]
});
console.log('Shop_setting Schema defind...');


// Create Model & Export
module.exports = mongoose.model('Shop', shopSchema);