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
        unique: {
            args: true,
            msg: 'Ce nom de catégorie est déjà utilisé.'
        },
        validate: {
            notEmpty: {
                args: true,
                msg: 'Le nom de catégorie ne doit pas être vide.'
            },
            len: {
                args: [2, 50],
                msg: 'Le nom de catégorie doit avoir entre 2 et 255 caractères.'
            }
        }
    }
}, {
    sequelize,
    timestamps: false,
    tableName: "category"
});

module.exports = Category
