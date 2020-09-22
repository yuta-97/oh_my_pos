const mongoose = require('mongoose')
    ,Schema = mongoose.Schema;
// Define Schemes
const goodsSchema = new mongoose.Schema({
  goodsname: { type: String, required: true, unique: true },
  // 카테고리 이름, ID를 저장 -> 카테고리 스키마를 외래키로 엮기 위해서!
  type: { 
    categoryname: {type: String, required: true, unique: true},
    categoryid: {type: Schema.Types.ObjectId, ref: 'Category'} 
  },
  price: { type: String, required: true },
  desc: { type: String, default: false }
});
console.log('Goods Schema defind...');


// Create Model & Export
module.exports = mongoose.model('Goods', goodsSchema);