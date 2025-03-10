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
    getShoppingIsActive: async (req, res) => {
        try {
            const activeShopping = await Shopping.findOne({
                where: {
                    isActive: true
                },
                include: [{
                    model: Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            });

            if (activeShopping) {
                res.json(activeShopping);
            } else {
                res.status(404).json({ message: 'Aucun shopping actif trouvé' });
            }
        } catch (error) {
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
    addingItem: async (req, res) =>{
        try {
            const { shoppingId, itemId } = req.params;
            const  quantity  = 1;
            const { unit } = req.body;
            let shopping = await Shopping.findByPk(shoppingId,{
                include: [{
                    model: Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            } );
            if(!shopping){
                return res.status(400).send('liste inexistante')
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
                quantity: Number(quantity),
                unit: unit,
            });
            const updatedShoppingList = await Shopping.findByPk(shoppingId, {
                include: [{
                    model: Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            });
            res.json(updatedShoppingList);
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    },
    createShopping: async (req, res) => {
        try {
            const { title, date, isActive, itemId, unit } = req.body;
            const shopping = new Shopping({
                title: title,
                date: date,
                isActive: isActive
            });
            await shopping.save();
            const shoppingId = shopping.id;
            const quantity = 1;
            await ShoppingItem.create({
                shopping_id: shoppingId,
                item_id: itemId,
                quantity: Number(quantity),
                unit: unit
            });
            const updatedShoppingList = await Shopping.findByPk(shoppingId, {
                include: [{
                    model: Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            });

            res.send(updatedShoppingList);
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },

    updateShopping: async (req, res) =>{
      try {
          const shoppingId = req.params.id;
          const {title, isActive, unit, quantity} = req.body;
          const shopping = await Shopping.findByPk(shoppingId);
          if (!shopping){
              return res.status(400).send('liste introuvable')
          }
          if (title || isActive || unit || quantity){
              shopping.title = title;
              shopping.isActive = isActive;
              shopping.unit = unit;
              shopping.quantity = Number(quantity);
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
            const updatedShoppingList = await Shopping.findAll( {
                include: [{
                    model: Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            });
            res.json(updatedShoppingList)
        }catch(err){
            console.trace('error delete',err);
            res.status(500).send(err.toString());
        }
    },
    updateItemQuantity: async (req, res) => {
        try {
            const { shoppingId, itemId } = req.params;
            const { quantity } = req.body;
            const transformQuantity = Number(quantity)
            const existingAssociation = await ShoppingItem.findOne({
                where: {
                    shopping_id: shoppingId,
                    item_id: itemId
                }
            });
            if (!existingAssociation) {
                return res.status(400).json({ message: 'Association inexistante' });
            }
            existingAssociation.quantity = transformQuantity;

            await existingAssociation.save();

            res.json(existingAssociation);
        } catch (err) {
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
            const updatedShoppingList = await Shopping.findByPk(shoppingId, {
                include: [{
                    model: Item,
                    as: 'items',
                    through: ShoppingItem
                }]
            });
            res.json(updatedShoppingList);

        }catch (err) {
            return console.log(err);
        }
    }
}

module.exports = shoppingController;
