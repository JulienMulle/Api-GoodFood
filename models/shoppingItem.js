const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class ShoppingItem extends Model {}
ShoppingItem.init({
    quantity:{
        type: DataTypes.DECIMAL
    },
    unit: {
        type: DataTypes.STRING,
        validate:{
            len:[1.10]
        }
    },
    isChecked: DataTypes.BOOLEAN
},
    {
        sequelize,
        timestamps: false,
        tableName:"shopping_item",
        primaryKey: true
    })
module.exports = ShoppingItem;
