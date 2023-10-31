const { Shopping, Item} = require('../models');

const shoppingController = {
    getAllShopping: async (req, res) => {
        try {
            const shopping = await Shopping.findAll();
            res.json(shopping)
        }catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    getShopping: async (req, res) =>{
        try {
            const shoppingId = req.params.id;
            const shopping = await Shopping.findByPk(shoppingId);
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
            await shopping.save;
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
            await shopping.destroy();
            res.send('list effacée')
        }catch(err){
            console.trace('error delete',err);
            res.status(500).send(err.toString());
        }
    },
    addingItem: async () =>{
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
            await Shopping.update({
                item_id: itemId,
                quantity: quantity,
                unit: unit
            });
            res.json({item_id: itemId,
                quantity: quantity,
                unit: unit});
        }catch (err) {
            console.trace(err);
            res.status(500).json(err.toString());
        }
    }
}

module.exports = shoppingController;
