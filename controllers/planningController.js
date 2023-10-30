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
            const recipeId = req.params.recipe_id;
            const recipe = await Recipe.findByPk(recipeId);
            const existingPlanningsCount = await Planning.count({
                where: {
                    day_of_week,
                    period,
                },
            });
            if (existingPlanningsCount >= 5) {
                return res.status(400).send("vous ne pouvez pas avoir plus de 5 recettes par periode");
            }

            const planning = new Planning({
                date,
                day_of_week,
                period,
                recipe
            });

            await planning.save();
            res.send(planning)
        }catch (err) {
            console.trace(err);
            res.status(500).send(err.toString());
        }
    }

}
module.exports = planningController;
