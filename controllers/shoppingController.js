const { Shopping, ShoppingItem, Item} = require('../models');

const shoppingController = {
    getAllShopping: async (req, res) => {
        try {
            const shopping = await Shopping.findAll( {
                include:[{
                    model:Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            });
            res.json(shopping)
        }catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    getShopping: async (req, res) =>{
        try {
            const shoppingId = req.params.id;
            const shopping = await Shopping.findByPk(shoppingId, {
                include:[{
                    model:Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            });
            res.json(shopping);
        }catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    createShopping: async (req, res) => {
        try {
            const {title,date } =req.body;
            const shopping = new Shopping({
                title: title,
                date: date
            })
            await shopping.save();
            res.send(shopping);
        }catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },
    updateShopping: async (req, res) =>{
      try {
          const shoppingId = req.params.id;
          const {title} = req.body;
          const shopping = await Shopping.findByPk(shoppingId);
          if (!shopping){
              return res.status(400).send('liste introuvable')
          }
          if (title){
              shopping.title = title;
          }
          await shopping.save();
          res.send(shopping)
      }catch (err) {
          console.trace(err);
          res.status(500).send(err.toString());
      }
    },
    deleteShopping: async (req, res)=>{
        try {
            const shoppingId = req.params.id;
            const shopping = await Shopping.findByPk(shoppingId);
            const association = await ShoppingItem.findAll({
                where:{shopping_id: shoppingId}
            })
            for (const asso of association){
                await asso.destroy();
            }

            await shopping.destroy();
            res.send('list effacée')
        }catch(err){
            console.trace('error delete',err);
            res.status(500).send(err.toString());
        }
    },
    addingItem: async (req, res) =>{
        try {
            const { shoppingId, itemId } = req.params;
            const { quantity, unit } = req.body;
            let shopping = await Shopping.findByPk(shoppingId);
            if(!shopping){
                return res.status(400).send('liste inexistante')
            }
            const item = await Item.findByPk(itemId);
            if (!item){
                return res.status(400).send('produit inconnue')
            }
            const existingAssociation = await ShoppingItem.findOne({
                where:{
                    item_id: itemId,
                    shopping_id: shoppingId
                }
            })
            if (existingAssociation) {
                return res.status(400).json('association deja actuel');
            }
            await ShoppingItem.create({
                shopping_id: shoppingId,
                item_id: itemId,
                quantity: quantity,
                unit: unit,
                isChecked: false
            });
            res.json({
                shopping_id: shoppingId,
                item_id: itemId,
                quantity: quantity,
                unit: unit,
                isChecked: false
            });
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
    deleteItem: async (req, res) =>{
        try {
            const { shoppingId, itemId } = req.params;
            const existingAssociation = await ShoppingItem.findOne({
                where:{
                    shopping_id: shoppingId,
                    item_id: itemId
                }
            });
            if(!existingAssociation){
                return res.status(400).json({message: 'association inexistante'});
            }
            await existingAssociation.destroy();
            res.json({message: 'suppression réussi'})

        }catch (err) {
            return console.log(err);
        }
    }
}

module.exports = shoppingController;
