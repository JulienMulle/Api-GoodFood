const {Recipe, Item} = require('../models');

const recipeController = {
    getAllRecipes: async (req, res) =>{
        try {
            const recipes = await Recipe.findAll({});
            res.send(recipes);
        }catch(err){
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },

    getRecipe: async (req, res) =>{
        try {
            const id = req.params.id;
            const recipe = await Recipe.findByPk(id);

            if (recipe){
                res.send(recipe);
                
            }else {
                res.status(400).send('recette inconnu')
            }
        }catch(err){
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },

    createRecipe: async (req, res) =>{
        try {
            const {title, ingredient, description } = req.body;
            const picture = `${req.protocol}://${req.get('host')}/IMG/${req.file.filename}`
            //let picture = req.file.path;
            
            if (!title) {
                return res.status(400).send('il manque soit le titre, soit au moins un ingredient ou une description')
            }else if (!ingredient) {
                return res.status(400).send('il manque au moins un ingredient ou une description')
            }else if (!description) {
                return res.status(400).send('il manque une description')
            }else if (!picture) {
                return res.status(400).send('il manque une photo')
            }
            
            const recipe = new Recipe({
                title,
                ingredient,
                description,
                picture,
            });

            await recipe.save();
            res.send(recipe);
            
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },
    
    updateRecipe: async (req, res) =>{
        try {
            const id = req.params.id;
            const { title, ingredient, description } = req.body;
            //const picture = req.file.path;
            const picture = `${req.protocol}://${req.get('host')}/IMG/${req.file.filename}`

            const recipe = await Recipe.findByPk(id);
            if (!recipe){
                return res.status(400).send('recette introuvable')
            }

            if(title || ingredient || description || picture){
                recipe.title = title,
                recipe.ingredient = ingredient,
                recipe.description = description,
                recipe.picture = picture
            }

            await recipe.save();
            res.send(recipe);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },

    deleteRecipe: async (req, res) =>{
        try {
            const id = req.params.id;
            const recipe = await Recipe.findByPk(id);

            if (!recipe) {
                return res.status(400).send('recette introuvable');
            }

            await recipe.destroy();
            res.send('recette supprimée')
        }catch(err){
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },

    associateRecipeToItem : async (req, res) =>{
        try {
            const {recipeId, itemId} = req.params;

            let recipe = await Recipe.findByPk(recipeId);
            if (!recipe){
                return res.status(400).send('je ne trouve pas cette recette');
            }

            const item = await Item.findByPk(itemId);
            if (!item){
                return res.status(400).send('je ne trouve pas ce produit');
            }
            
            await item.addRecipe(recipe);
            item = await Item.findByPk(itemId, {
                include:['recipes'],
            })

            res.send(recipe);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },

    deleteRecipeToItem : async (req, res) =>{
        try {
            const {recipeId, itemId} = req.params;

            let recipe = await Recipe.findByPk(recipeId);
            if (!recipe){
                return res.status(400).send('je ne trouve pas cette recette');
            }

            const item = await Item.findByPk(itemId);
            if (!item){
                return res.status(400).send('je ne trouve pas ce produit');
            }
            
            await item.removeRecipe(recipe);
            item = await Item.findByPk(itemId, {
                include:['recipes'],
            })

            res.send(recipe);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },

};

module.exports = recipeController;