const Sequelize = require('sequelize');
const sequelize = new Sequelize('company-review', 'root', 'Shubham@9767',
    {
        dialect: 'mysql',
        host: 'localhost',
    });

module.exports = sequelize;