const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    getFullname(){
        return this.name;
    }
};

User.init({
    id:{ type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true},
    name:{type: DataTypes.STRING, allowNull: false},
    email:{type: DataTypes.STRING, allowNull: false},
    password:{type: DataTypes.STRING, allowNull: false}
}, {
    sequelize,
    timestamps: false,
    tableName: "user"
});

module.exports = User;