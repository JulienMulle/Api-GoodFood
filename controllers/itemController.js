const {
    Item, Category,
    Recipe,
    ItemRecipe
} = require('../models/');

const itemController = {

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
                res.status(404).json('produit inconnu');
            }
        }catch(err){
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
            res.json({item_id: itemId,
                recipe_id: recipeId,
                quantity: quantity,
                unit: unit,});
        } catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
    deleteAssociationRecipe: async (req, res) => {
        try {
            const { itemId, recipeId } = req.params;
            const existingAssociation = await ItemRecipe.findOne({
                where: {
                    item_id: itemId,
                    recipe_id: recipeId,
                },
            });
            if (!existingAssociation) {
                return res.status(400).json({message: 'association inexistante'});
            }
            await existingAssociation.destroy();
            res.json({message: 'suppression réussi'});
        } catch (err) {
            return console.log(err);
        }
    },
}

module.exports = itemController;
