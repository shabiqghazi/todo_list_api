const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Checklist = sequelize.define('Checklist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Checklist;