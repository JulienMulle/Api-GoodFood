const Category = require('./category');
const Item = require('./item');
const Recipe = require('./recipe');
const User = require('./user');
const ItemRecipe = require('./itemRecipe')


//peut crée, 0N user, 11 recipe
Recipe.belongsTo(User, {
    foreignKey: 'user_id',

});
//reciproque
User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

//peut crée, 0N user, 11 category
Category.belongsTo(User, {
    foreignKey: 'user_id'
});
//reciproque
User.hasMany(Category, {
    foreignKey: 'user_id'
});

//peut crée, 0N user, 11 item
Item.belongsTo(User, {
    foreignKey: 'user_id'
});
//reciproque
User.hasMany(Item, {
    foreignKey: 'user_id'
})

// Chaque recette peut appartenir à plusieurs catégories,
// et chaque catégorie peut contenir plusieurs recettes.
Recipe.belongsToMany(Category, {
    foreignKey: 'recipe_id',
    otherKey: 'category_id',
    through: 'recipe_category'
})
//reciproque
Category.belongsToMany(Recipe, {
    foreignKey: 'category_id',
    otherKey: 'recipe_id',
    through: 'recipe_category'
});

// Chaque article peut appartenir à plusieurs catégories,
// et chaques catégorie peut contenir plusieurs articles.
Item.belongsToMany(Category, {
    foreignKey: 'item_id',
    otherKey: 'category_id',
    through: 'category_item',

});
//reciproque
Category.belongsToMany(Item, {
    foreignKey: 'category_id',
    otherKey: 'item_id',
    through: 'category_item',
    as: 'categorie'

})

//reciproque
Item.belongsToMany(Recipe, {
    otherKey:'recipe_id',
    foreignKey:'item_id',
    through:'ItemRecipe'
})


module.exports = {
    Category,
    Item,
    Recipe,
    User,
    ItemRecipe
}
