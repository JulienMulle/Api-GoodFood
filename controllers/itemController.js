const {Item, Category, Recipe, ItemRecipe} = require('../models/');
const { findByPk} = require("../models/recipe");

const itemController = {

    viewAllItemsForCategories: async (req, res) => {
        const id = req.params.id;
        try {
            const item = await Item.findByPk(id, {
                include: [

                    { association: ''}
                ]
            });
            res.status(200).json(item)
        }catch (err) {
            console.trace(err);
            res.status(500).send(err);
        }
    },

    getAllItems : async (req, res) => {
        try {
            const items = await Item.findAll();
            res.json(items);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    getItem: async (req, res) => {
        try {
            const id = req.params.id;
            const item = await Item.findByPk(id);

            if (item){
                res.json(item);
            }else {
                res.status(400).json('produit inconnu');
            }
        }catch (err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    createItem: async (req, res) => {
        try {
            const {name} = req.body;

            if (!name) {
                return res.status(400).json('il manque le nom')
            }

            const item = new Item({
                name,
            });

            await item.save();
            res.status(201).json(item);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    updateItem: async(req, res) =>{
        try {
            const id = req.params.id;
            const {name} = req.body;

            const newitem = await Item.findByPk(id);
            if (!newitem) {
                return res.status(400).json('produit inconnu')
            }
            if(name) {
                newitem.name = name;
            }

            await newitem.save();
            res.status(200).json(newitem);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    deleteItem: async(req, res) =>{
        try {
            const id = req.params.id;
            const item = await Item.findByPk(id);

            if (item) {
                await item.destroy();
                res.json('ok');
            }else {
                res.status(404).json('Can\t find any list with this ID.');
            }
        }catch(err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    associateCategoryToItem: async (req, res) =>{
        try {
            const {categoryId, itemId } = req.params;

            let item = await Item.findByPk(id, {
                include: ['categories'],
            });
            if (!item){
                return res.status(400).json('produit inconnu');
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(400).json('categorie inconnu');
            }

            await item.addCategory(category);
            item = await Item.findByPk(itemId, {
                include: ['categories'],
            })

            res.json(item);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    deleteCategoryToItem: async (req, res) =>{
        try {
            const {categoryId, itemId} = req.params;

            let item = await Item.findByPk(id, {
                include: ['categories'],
            });
            if (!item){
                return res.status(400).json('produit inconnu');
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(400).json('categorie inconnu');
            }

            await item.removeCategory(category);
            item = await Item.findByPk(itemId, {
                include: ['categories'],
            })

            res.json(item);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    associateRecipeToItem: async (req, res) => {
        try {
            const { itemId, recipeId } = req.params;
            const { quantity, unit } = req.body;
            let item = await Item.findByPk(itemId);
            if (!item) {
                return res.status(400).json('Produit inconnu');
            }
            const recipe = await Recipe.findByPk(recipeId);
            if (!recipe) {
                return res.status(400).json('Recette inconnue');
            }
            const existingAssociation = await ItemRecipe.findOne({
                where: {
                    item_id: itemId,
                    recipe_id: recipeId,
                },
            });

            if (existingAssociation) {
                return res.status(200).json(item);
            }
            await ItemRecipe.create({
                item_id: itemId,
                recipe_id: recipeId,
                quantity: quantity,
                unit: unit,
            });
            item = await Item.findByPk(itemId, {
                include: [{
                    model: Recipe,
                    as: 'recipe',
                    through: {
                        model: ItemRecipe,
                    },
                }],
            });
            res.json(item);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    removeFromRecipe: async (req, res) => {
        try {
            const { itemId, recipeId } = req.params;
            let item = await Item.findByPk(itemId);
            if (!item) {
                return res.status(400).json('Produit inconnu');
            }
            const recipe = await findByPk(recipeId);
            if (!recipe) {
                return res.status(400).json('Recette inconnue');
            }
            await Item.destroy(recipe);
            item = await Item.findByPk(itemId);

            res.json(item);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
}

module.exports = itemController;
