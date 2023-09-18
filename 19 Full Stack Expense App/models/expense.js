const Sequelize = require('sequelize')
const sequelize = require('../util/database');

const Expense = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    }
})

module.exports = Expense;