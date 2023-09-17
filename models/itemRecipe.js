const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class ItemRecipe extends Model {}
ItemRecipe.init({
    quantity: {
        type: DataTypes.DECIMAL,
    },
    unit: {
        type: DataTypes.STRING,
        validate:{
            len:[1,10]
        }
    },

},
    {
        sequelize,
        timestamps: false,
        tableName: "item_recipe",
        primaryKey: true
    })
module.exports = ItemRecipe;
