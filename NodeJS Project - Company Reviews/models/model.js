const Sequelize = require('sequelize');
const sequelize = require('../util/databse');

const companyReview = sequelize.define('reviews', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    companyName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    pros: Sequelize.STRING,
    cons: Sequelize.STRING,
    rating: Sequelize.INTEGER
});

module.exports = companyReview;