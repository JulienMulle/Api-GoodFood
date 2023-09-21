const {
    Category,
    Item,
    CategoryItem,
    CategoryRecipe,
    Recipe,RecipeCategory
    } = require('../models');

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
            await Category.create({
                name: name
            });
            res.status(201).json();
        } catch (err) {
            console.trace(err);
            res.json()
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
    associateRecipeToCategory: async (req, res) =>{
        try {
            const { recipeId,categoryId } = req.params;
            const recipe = await Recipe.findByPk(recipeId, {
                model: Recipe,
                include: ['categories']
            })
            if (!recipe){
                return res.status(400).json('recette inconnu');
            }
            const category = await Category.findByPk(categoryId, {
                include: ['recipes']
            });
            if (!category) {
                return res.status(400).json('categorie inconnu');
            }
            const existingAssociation = await CategoryRecipe.findOne({
                where: {
                    recipe_id: recipeId,
                    category_id: categoryId,
                },
            });
            if (existingAssociation) {
                return res.status(200).json({ message:'Association exitante'});
            }
            await CategoryRecipe.create({
                recipe_id: recipeId,
                category_id: categoryId,
            });
            res.json({
                recipe_id: recipeId,
                category_id: categoryId,
            });
        }catch (err) {
            console.trace(err, );
            res.status(500).json(err.toString());
        }
    },
    deleteCategoryToRecipe: async (req, res) =>{
        try {
            const {categoryId, recipeId} = req.params;
            const existingAssociation = await CategoryRecipe.findOne({
                where: {
                    recipe_id: recipeId,
                    category_id: categoryId,
                },
            });
            if (!existingAssociation) {
                return res.status(400).json({ message:'Association inexistante'});
            }
            await existingAssociation.destroy();
            res.json({message: 'suppression réussi'});
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
    associateItemToCategory: async (req, res) =>{
        try {
            const { itemId,categoryId } = req.params;
            let item = await Item.findByPk(itemId);
            if (!item){
                return res.status(400).json('produit inconnu');
            }
            item = await Item.findByPk(itemId, {
                include: ['categories'],
            })
            const category = await Category.findByPk(categoryId, {
                include: ['items']
            });
            if (!category) {
                return res.status(400).json('categorie inconnu');
            }
            const existingAssociation = await CategoryItem.findOne({
                where: {
                    item_id: itemId,
                    category_id: categoryId,
                },
            });
            if (existingAssociation) {
                return res.status(200).json({ message:'Association exitante',item});
            }
            await CategoryItem.create({
                item_id: itemId,
                category_id: categoryId,
            });
            res.json({
                item_id: itemId,
                category_id: categoryId,
            });
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
    deleteCategoryToItem: async (req, res) =>{
        try {
            const {categoryId, itemId} = req.params;
            const existingAssociation = await CategoryItem.findOne({
                where: {
                    item_id: itemId,
                    category_id: categoryId,
                },
            });
            if (!existingAssociation) {
                return res.status(400).json({ message:'Association inexistante'});
            }
            await existingAssociation.destroy();
            res.json({message: 'suppression réussi'});
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
};

module.exports = categoryController;
