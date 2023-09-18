const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-app', 'root', 'Shubham@9767', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;