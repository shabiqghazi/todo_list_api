const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: process.env.DATABASE_SSL === 'true' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

module.exports = sequelize;