const {  Model } = require('sequelize');
const sequelize = require('../db');

class CategoryItem extends Model {}
CategoryItem.init({

    },
    {
        sequelize,
        timestamps: false,
        tableName: "category_item",
        primaryKey: true
    })
module.exports = CategoryItem;
