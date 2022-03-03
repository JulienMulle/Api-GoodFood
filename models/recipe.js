const { TEXT } = require('sequelize');
const {DataTypes, Model, Sequelize} = require('sequelize');
const sequelize = require('../db');

class Recipe extends Model {};

Recipe.init({
    id:{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true },
    ingredient: {type: Array(TEXT)},
    description: DataTypes.TEXT,
    picture: DataTypes.STRING

}, {
    sequelize,
    timestamps: false,
    tableName: "recipe"
});

module.exports = Recipe;