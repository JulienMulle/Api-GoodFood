const {DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Recipe extends Model {}

Recipe.init({
    id:{ type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 255],
            notEmpty: true,
        },
    },
    description: DataTypes.TEXT,
    picture: {
        type:DataTypes.STRING,
        validate: {
            isUrl: {
                msg: 'La valeur de picture doit être une URL valide.',
            },
        },
    }

}, {
    sequelize,
    timestamps: false,
    tableName: "recipe"
});

module.exports = Recipe;
