const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('goodfood', 'Julien', 'anais,2105', {
    host:'localhost',
    dialect: 'postgres',
    omitNull: true
});

try{
    sequelize.authenticate();
    console.log('connexion à la bdd : ok');
} catch(error){
    console.error('connexion à la bdd : nope', error);
}

module.exports = sequelize;