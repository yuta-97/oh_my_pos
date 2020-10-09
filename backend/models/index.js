'use strict';

const path = require('path');
const Sequelize = require('sequelize');
// const env = process.env.NODE_ENV || 'development';
const env = 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Store = require('./store')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Goods = require('./goods')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);

// User, Store 일대 다 관계
db.User.hasMany(db.Store, {
  foreignKey: 'user_id',
  sourceKey: 'user_id',
  onDelete: 'CASCADE'
});
db.Store.belongsTo(db.User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
  onDelete: 'CASCADE'
});

// Store, Category 일대 다 관계
db.Store.hasMany(db.Category, {
  foreignKey: 'store_name',
  sourceKey: 'store_name',
  onDelete: 'CASCADE'
});
db.Category.belongsTo(db.Store, {
  foreignKey: 'store_name',
  targetKey: 'store_name',
  onDelete: 'CASCADE'
});

// Category, Goods 일대 다 관계
db.Category.hasMany(db.Goods, {
  foreignKey: 'category_name',
  sourceKey: 'category_name',
  onDelete: 'CASCADE'
});
db.Goods.belongsTo(db.Category, {
  foreignKey: 'category_name',
  targetKey: 'category_name',
  onDelete: 'CASCADE'
});




module.exports = db;
