const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class ItemRecipe extends Model {}
ItemRecipe.init({
    quantity: {
        type: DataTypes.DECIMAL,
    },
    unit: {
        type: DataTypes.DECIMAL,
    },
    primaryKey: true
},
    {
        sequelize,
        timestamps: false,
        tableName: "category"
    })
module.exports = ItemRecipe;
