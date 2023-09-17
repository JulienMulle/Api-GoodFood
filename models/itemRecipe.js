const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const itemRecipe = sequelize.define('ItemRecipe', {
    quantity: {
        type: DataTypes.NUMERIC,
    },
    unit: {
        type: DataTypes.NUMERIC,
    },
},
    {
        primaryKey: true
    });

module.exports = itemRecipe;
