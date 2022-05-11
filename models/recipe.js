const {DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Recipe extends Model {};

Recipe.init({
    id:{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true },
    description: DataTypes.TEXT,
    picture: DataTypes.STRING

}, {
    sequelize,
    timestamps: false,
    tableName: "recipe"
});

module.exports = Recipe;