const Category = require('./category');
const Item = require('./item');
const Recipe = require('./recipe');
const User = require('./user');
const ItemRecipe = require('./itemRecipe')
const CategoryItem = require("./categoryItem");
const CategoryRecipe = require("./categoryRecipe");


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
    foreignKey: 'category_id',
    otherKey: 'recipe_id',
    through: { model: CategoryRecipe, unique: false },
    as: 'categories'
})
//reciproque
Category.belongsToMany(Recipe, {
    foreignKey: 'category_id',
    otherKey: 'recipe_id',
    through: { model: CategoryRecipe, unique: false },
    as:'recipes'
});
// Chaque article peut appartenir à plusieurs catégories,
// et chaques catégorie peut contenir plusieurs articles.
Item.belongsToMany(Category, {
    foreignKey: 'item_id',
    otherKey: 'category_id',
    through: { model: CategoryItem, unique: false },
    as:'categories'
});
//reciproque
Category.belongsToMany(Item, {
    foreignKey: 'category_id',
    otherKey: 'item_id',
    through: { model: CategoryItem, unique: false },
    as: 'items'
})
//est composé de, ON item, 1N recipe
Recipe.belongsToMany(Item,{
    foreignKey:'item_id',
    otherKey:'recipe_id',
    through: {model: ItemRecipe, unique: false },
    as:'items'
});
//reciproque
Item.belongsToMany(Recipe, {
    otherKey:'recipe_id',
    foreignKey:'item_id',
    through: {model: ItemRecipe, unique: false },
    as: 'recipes',
})
module.exports = {
    Category,
    Item,
    Recipe,
    User,
    ItemRecipe,
    CategoryItem,
    CategoryRecipe
}
