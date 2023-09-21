const {  Model,DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../db');

class CategoryRecipe extends Model {}
CategoryRecipe.init({},
    {
        sequelize,
        timestamps: false,
        tableName: "category_Recipe",
        primaryKey: true
    })
module.exports = CategoryRecipe;
