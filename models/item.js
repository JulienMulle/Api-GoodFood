const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Item extends Model {};

Item.init({
    id:{ 
        type: DataTypes.NUMBER,  
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
}, {
    initialAutoIncrement: 1,
    sequelize,
    timestamps: false,
    tableName: "item",
    
});

module.exports = Item;