const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const itemController = require('./controllers/itemController');
const recipeController = require('./controllers/recipeController');
const multer = require('./middlewares/uploadMedia');

const router = express.Router();

//routes pour login/signup/logout
router.get('/login', userController.getAllUsers);
router.post('/login', userController.logIn);
router.get('/logout', userController.logOut);
router.post('/signup', userController.signUp);
//router.get('/profile', userController.viewProfile);

//routes pour les categories
router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.createCategory);
router.get('/categories/:id', categoryController.getCategory);
router.patch('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);
//router.post('/categories/:categoryId/recipes') à y songer

//routes pour les items
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.viewAllItemsForCategories);
router.get('/items/:id', itemController.getItem);
router.post('/items/', itemController.createItem);
router.patch('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);
router.post('/items/:itemId/categories/:categoryId', itemController.associateCategoryToItem);
router.delete('/items/:itemId/categories/:categoryId', itemController.deleteCategoryToItem);

//routes pour recipes
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipes/:id', recipeController.getRecipe);
router.post('/recipes/',multer, recipeController.createRecipe) /**/;
router.patch('/recipes/:id', multer, recipeController.updateRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);
router.post('/recipes/:recipeId/items/:itemId', recipeController.associateRecipeToItem);
router.delete('/recipes/:recipeId/items/:itemId', recipeController.deleteRecipeToItem);

module.exports = router;