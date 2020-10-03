'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);



db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Store = require('./store')(sequelize, Sequelize);

db.User.hasMany(db.Store, {
  foreignKey: 'user_id',
  sourceKey: 'user_id'
});
db.Store.belongsTo(db.User, {
  foreignKey: 'user_id',
  targetKey: 'user_id'
});

module.exports = db;
