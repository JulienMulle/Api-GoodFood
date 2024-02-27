const {
    Recipe,
    Item,
    ItemRecipe,
    Category, CategoryItem,
    CategoryRecipe
} = require('../models');

const recipeController = {
    getAllRecipes: async (req, res) =>{
        try {
            const recipes = await Recipe.findAll({
                include:[{
                    model:Item,
                    as:'items',
                    through: ItemRecipe
                },{
                    model:Category,
                    as:'categories',
                    through: {
                        model: CategoryRecipe
                    }
                }]
            });
            res.send(recipes);
        }catch(err){
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },
    createRecipe: async (req, res) => {
        try {
            const { title, description } = req.body;
            if (!title) {
                return res.status(400).send('Il manque le titre');
            } else if (!description) {
                return res.status(400).send('Il manque une description');
            }
            if (!req.file) {
                return res.status(400).send('Il manque une photo');
            }
            const picture = `${req.protocol}://${req.get('host')}/IMG/${req.file.filename}`;
            const recipe = new Recipe({
                title,
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
            const { title, description } = req.body;
            const picture = `${req.protocol}://${req.get('host')}/IMG/${req.file.filename}`
            const recipe = await Recipe.findByPk(id);
            if (!recipe){
                return res.status(400).send('recette introuvable')
            }
            if(title ||  description || picture){
                recipe.title = title
                recipe.description = description
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

            const categoriesAssociations = await CategoryRecipe.findAll({
                where: { recipe_id: recipe.id}
            })
            console.log(categoriesAssociations)
            for (const associationCategories of categoriesAssociations){
                await associationCategories.destroy();
            }
            const itemAssociations = await ItemRecipe.findAll({
                where: { recipe_id: recipe.id },
            });
            for (const associationItems of itemAssociations) {
                await associationItems.destroy();
            }
            await recipe.destroy();
            res.send('recette supprimée')
        }catch(err){
            console.trace('error delete',err);
            res.status(500).send(err.toString());
        }
    },
    getRecipeWithItems: async (req, res)=>{
        try {
            const id = req.params.id;
            const recipe = await Recipe.findByPk(id, {
                include: [{
                    model: Item,
                    as: 'items',
                    through: ItemRecipe
                }],
            });
            if (!recipe) {
                return res.status(404).json('Recette non trouvée');
            }

            res.json(recipe);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
    getRecipeWithItemAndCategories: async (req, res)=>{
        try {
            const id = req.params.id;
            const recipe = await Recipe.findByPk(id, {
                include: [{
                    model: Item,
                    as: 'items',
                    through: {
                        model: ItemRecipe,
                    }},
                    {
                        model:Category,
                        as:'categories',
                        through: {
                            model: CategoryRecipe
                        }
                    }
                ],
            });
            if (!recipe) {
                return res.status(404).json('Recette non trouvée');
            }

            res.json(recipe);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    }



};

module.exports = recipeController;
