const express = require('express');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const authController = require('../controllers/authController');
const router = express.Router();

//User
//Registrar un usuario público utilizando Google
router.post('/', userController.createUser);

//Obtener datos del perfil de un usuario público para el id:' + req.params.userId
router.get('/:userId', userController.getUserById);

//Editar los datos del perfil del usuario público para el id:' + req.params.userId
router.put('/:userId', userController.updateUserById);

//Dar de baja la cuenta de un usuario público para el id:' + req.params.userId
router.delete('/:userId', userController.deleteUserById);

//User Favourites
//Guarda una receta en favoritos para el user id: ' + req.params.userId
router.post('/:userId/favourites/', recipeController.saveRecipeToFavorites);

//Eliminar receta guardada en favoritos para el user id:' + req.params.userId
router.delete('/:userId/favourites/:recipeId', recipeController.removeRecipeFromFavorites);

//'Muestra una lista de recetas favoritas para el user id: ' + req.params.userId
router.get('/:userId/favourites', recipeController.getFavoriteRecipes);

//Iniciar sesión
router.post('/login', authController.login);

//Cerrar sesión
router.post('/logout', authController.logout);

//Refrescar token
router.post('/refreshToken', authController.refreshToken);

//Obtener receta de un usuario para el Userid:' + req.params.userId + ' y recipeId' + req.params.recipeId
router.get('/:userId/recipes/:recipeId', recipeController.getRecipeById);

//Actualizar receta de un usuario para el Userid:' + req.params.userId + ' y recipeId' + req.params.recipeId
router.put('/:userId/recipes/:recipeId', recipeController.updateRecipeById);

//Eliminar receta de un usuario para el Userid:' + req.params.userId + ' y recipeId' + req.params.recipeId
router.delete('/:userId/recipes/:recipeId', recipeController.deleteRecipeById);

module.exports = router; 