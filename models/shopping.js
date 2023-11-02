const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Shopping extends Model {}
Shopping.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: DataTypes.STRING,
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    sequelize,
    timestamps: false,
    tableName: "shopping"
});

module.exports = Shopping;
