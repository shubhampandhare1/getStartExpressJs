const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('users', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
    },
    Email: {
        type: Sequelize.STRING,
        unique: true,
    },
    Mobile: {
        type: Sequelize.INTEGER,
        unique: true,
    }
})

module.exports = User;