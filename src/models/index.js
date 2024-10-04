// src/models/index.js
const sequelize = require('../config/database');
const User = require('./user');
const Checklist = require('./checklist');
const Item = require('./item');

User.hasMany(Checklist);
Checklist.belongsTo(User);

Checklist.hasMany(Item);
Item.belongsTo(Checklist);

module.exports = {
  sequelize,
  User,
  Checklist,
  Item
};