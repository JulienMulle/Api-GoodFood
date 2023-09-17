const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Item extends Model {};

Item.init({
   id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 20],
            notEmpty: true,
        }
    }
}, {
    initialAutoIncrement: 1,
    sequelize,
    timestamps: false,
    tableName: "item",

});

module.exports = Item;
