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
router.post('/category', categoryController.createCategory);
router.get('/category/:id', categoryController.getCategory);
router.patch('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);
//router.post('/categories/:categoryId/recipes') à y songer

//routes pour les items
router.get('/items', itemController.getAllItems);
//router.get('/item/:id', itemController.viewAllItemsForCategories);
router.get('/item/:id', itemController.getItem);
router.post('/item/', itemController.createItem);
router.patch('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);
router.post('/items/:id/categories/:categoryId', itemController.associateCategoryToItem);
router.delete('/items/:itemId/categories/:categoryId', itemController.deleteCategoryToItem);
router.post('/item/:itemId/associateRecipe/:recipeId', itemController.associateRecipeToItem);
router.delete('/:itemId/removeFromRecipe/:recipeId', itemController.removeFromRecipe);

//routes pour recipes
router.get('/recipes', recipeController.getAllRecipes);
router.get('/recipe/:id', recipeController.getRecipe);
router.post('/recipe/', multer, recipeController.createRecipe);
router.patch('/recipe/:id', multer, recipeController.updateRecipe);
router.delete('/recipe/:id', recipeController.deleteRecipe);
router.post('/recipe/:recipeId/items/:itemId', recipeController.associateRecipeToItem);
router.delete('/recipe/:recipeId/items/:itemId', recipeController.deleteRecipeToItem);

module.exports = router;
