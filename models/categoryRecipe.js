const {  Model } = require('sequelize');
const sequelize = require('../db');

class CategoryRecipe extends Model {}
CategoryRecipe.init({},
    {
        sequelize,
        timestamps: false,
        tableName: "category_item",
        primaryKey: true
    })
module.exports = CategoryRecipe;
