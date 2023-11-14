const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const { BOOLEAN } = require('sequelize');

class Shopping extends Model {}
Shopping.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.STRING,
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isActive: BOOLEAN
}, {
    sequelize,
    timestamps: false,
    tableName: "shopping"
});

module.exports = Shopping;
