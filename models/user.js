const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

class User extends Model {
    getFullname(){
        return this.name;
    }
};

User.init({
    id:{ type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50],
            notEmpty: true
        }
    },
    email:{type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
            isEmail:true
        }
    },
    password:{type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 50],
            notEmpty: true
        }
    }
}, {
    sequelize,
    timestamps: false,
    tableName: "user"
});

module.exports = User;
