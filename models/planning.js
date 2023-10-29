const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class Planning extends Model {}

Planning.init({
    id:{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    day_of_week:DataTypes.STRING,
    period:DataTypes.STRING,
},{
    sequelize,
    tableName:"planning"
})

module.exports = Planning;
