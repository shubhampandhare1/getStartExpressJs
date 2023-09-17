const Sequelize = require('sequelize');

const sequelize = new Sequelize('book-appointment-app', 'root', 'Shubham@9767', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;