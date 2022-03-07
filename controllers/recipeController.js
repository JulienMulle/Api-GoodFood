const {Recipe, Item} = require('../models');

const recipeController = {
    getAllRecipes: async (req, res) =>{
        try {
            const recipes = await Recipe.findAll();
            res.json(recipes);
        }catch(err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    getRecipe: async (req, res) =>{
        try {
            const id = req.params.id;
            const recipe = await Recipe.findByPk(id);

            if (recipe){
                res.json(recipe);
            }else {
                res.status(400).json('recette inconnu')
            }
        }catch(err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    createRecipe: async (req, res) =>{
        try {
            const {title, ingredient, description, picture } = req.body;
            const bodyErrors = [];

            if (!title || !ingredient || !description) {
                return res.status(400).json('il manque soit le titre, soit au moins un ingredient ou une description')
            }
            
            const recipe = new Recipe({
                title,
                ingredient,
                description,
                picture
            });

            await recipe.save();
            res.json(recipe);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
    
    updateRecipe: async (req, res) =>{
        try {
            const id = req.params.id;
            const { title, ingredient, description, picture } = req.body;

            const recipe = await Recipe.findByPk(id);
            if (!recipe){
                return res.status(400).json('recette introuvable')
            }

            if(title || ingredient || description || picture){
                recipe.title = title,
                recipe.ingredient = ingredient,
                recipe.description = description,
                recipe.picture = picture
            }

            await recipe.save();
            res.json(recipe);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    deleteRecipe: async (req, res) =>{
        try {
            const id = req.params.id;
            const recipe = await Recipe.findByPk(id);

            if (!recipe) {
                return res.status(400).json('recette introuvable');
            }

            await recipe.destroy();
            res.json('recette supprimée')
        }catch(err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    associateRecipeToItem : async (req, res) =>{
        try {
            const {recipeId, itemId} = req.params;

            let recipe = await Recipe.findByPk(recipeId);
            if (!recipe){
                return res.status(400).json('je ne trouve pas cette recette');
            }

            const item = await Item.findByPk(itemId);
            if (!item){
                return res.status(400).json('je ne trouve pas ce produit');
            }
            
            await item.addRecipe(recipe);
            item = await Item.findByPk(itemId, {
                include:['recipes'],
            })

            res.json(recipe);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    deleteRecipeToItem : async (req, res) =>{
        try {
            const {recipeId, itemId} = req.params;

            let recipe = await Recipe.findByPk(recipeId);
            if (!recipe){
                return res.status(400).json('je ne trouve pas cette recette');
            }

            const item = await Item.findByPk(itemId);
            if (!item){
                return res.status(400).json('je ne trouve pas ce produit');
            }
            
            await item.removeRecipe(recipe);
            item = await Item.findByPk(itemId, {
                include:['recipes'],
            })

            res.json(recipe);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

};

module.exports = recipeController;