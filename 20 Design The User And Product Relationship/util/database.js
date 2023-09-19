const Sequelize = require('sequelize');     //Sequelize class

//create new Sequelize instance
const sequelize = new Sequelize('node-complete', 'root', 'Shubham@9767',
    {
        dialect: 'mysql',
        host: 'localhost'
    });

module.exports = sequelize;