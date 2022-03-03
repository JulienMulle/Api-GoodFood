const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Category extends Model {};

Category.init({
    id:{ 
        type: DataTypes.NUMBER, 
        autoIncrement: true, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }  
}, {
    sequelize,
    timestamps: false,
    tableName: "category"
});

module.exports = Category