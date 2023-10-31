const {
    Planning, Recipe
} = require('../models')

const planningController ={
    getAllPlannings: async (req, res)=>{
        try {
            const plannings = await Planning.findAll();
            res.json(plannings);
        }catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    getPlanning: async (req, res) => {
        try {
            const planningId = req.params.id;
            const planning = await Planning.findByPk(planningId)
            res.json(planning);
        }catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    createPlanning: async (req, res) => {
        try {
            const {date, day_of_week, period} = req.body;
            const recipeId = req.params.recipeId;
            const recipe = await Recipe.findByPk(recipeId);

            const planning = new Planning({
                date : date,
                day_of_week: day_of_week,
                period: period,
                recipe_id: recipeId
            });

            await planning.save();
            res.send(planning)
        }catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },
    updatePlanning: async (req, res) =>{
        try{
            const planningId = req.params.id;
            const { period, date, day_of_week, recipe_id } = req.body;
            const planning = await Planning.findByPk(planningId)
            if(!planning){
                return res.status(400).send('planning introuvable')
            }
            if(period || date || day_of_week || recipe_id){
                planning.period = period
                planning.date = date
                planning.day_of_week = day_of_week
                planning.recipe_id = recipe_id
            }
            await planning.save();
            res.send(planning)
        }catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    },
    deletePlanning: async (req, res) => {
        try {
            const planningId = req.params.id;
            const planning = await Planning.findByPk(planningId)
            await planning.destroy()
            res.send('plannification supprimée')
        } catch(err){
            console.trace('error delete',err);
            res.status(500).send(err.toString());
        }
    }

}
module.exports = planningController;
