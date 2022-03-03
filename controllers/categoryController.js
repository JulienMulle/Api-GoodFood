const {Category} = require('../models');

const categoryController = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.findAll();
            res.json(categories);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    getCategory: async(req, res) =>{
        try{
            const id = req.params.id;
            const category = await Category.findByPk(id);

            if (category){
                res.json(category);
            }else{
                res.status(400).json('categorie inconnu')
            }
        }catch(err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    createCategory: async(req, res) =>{
        try{
            const {name} = req.body;

            if (!name) {
                return res.status(400).json('il manque le nom');
            }

            const category = new Category({
                name
            });

            await category.save();
            res.json(category);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    updateCategory: async(req, res) =>{
        try {
            const id = req.params.id;
            const {name} = req.body;

            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(400).json('categorie inconnu')
            }

            if(name) {
                category.name = name;
            }

            await category.save();
            res.json(category);
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },

    deleteCategory: async(req, res) =>{
        try {
            const id = req.params.id;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json('categorie inconnu');
            }

            await category.destroy();
            res.json('ok');
        }catch(err){
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
        // à voir pour une eventuelle categorisation des recettes
    /*associateCategoryToRecipe: async (req, res) =>{
        try {
            const {categoryId, recipeId } = req.params;
            
            let recipe = await Recipe.findByPk(recipeId, {
                include: ['categories'],
            });
            if (!recipe){
                return res.status(400).json('je ne trouve pas cette recette');
            }

            const category = await Category.findByPk(categoryId);
            if (!category) {
                return res.status(400).json('je ne trouve pas cette categorie');
            }

            await recipe.addCategory(category);
            recipe = await Recipe.findByPk(recipeId, {
                include: ['categories'],
            })

            res.json(recipe);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },*/
};

module.exports = categoryController;