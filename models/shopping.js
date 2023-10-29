const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Shopping extends Model {}
Shopping.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    quantity: DataTypes.DECIMAL,
    unit: DataTypes.STRING,
}, {
    sequelize,
    tableName: "shopping"
});

module.exports = Shopping;
