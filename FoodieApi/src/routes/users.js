const express = require('express');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const authController = require('../controllers/authController');
const filesController = require('../controllers/filesController');
const auth = require('../services/authService');
const router = express.Router();

//User
//Registrar un usuario público utilizando Google
router.post('/', userController.createUser);

//Obtener datos del perfil de un usuario público para el id:' + req.params.userId
router.get('/:userId', auth.authenticateToken, userController.getUserById);

//Editar los datos del perfil del usuario público para el id:' + req.params.userId
router.put('/:userId', auth.authenticateToken, userController.updateUserById);

//Dar de baja la cuenta de un usuario público para el id:' + req.params.userId
router.delete('/:userId', auth.authenticateToken, userController.deleteUserById);

//User Favourites
//Guarda una receta en favoritos para el user id: ' + req.params.userId
router.post('/:userId/favourites/', auth.authenticateToken, recipeController.saveRecipeToFavorites);

//Eliminar receta guardada en favoritos para el user id:' + req.params.userId
router.delete('/:userId/favourites/:recipeId', auth.authenticateToken, recipeController.removeRecipeFromFavorites);

//'Muestra una lista de recetas favoritas para el user id: ' + req.params.userId
router.get('/:userId/favourites', auth.authenticateToken, recipeController.getFavoriteRecipes);

//Iniciar sesión
router.post('/login', authController.login);

//Cerrar sesión
router.post('/logout', auth.authenticateToken, authController.logout);

//Refrescar token
router.post('/refreshToken', authController.refreshToken);

//Obtener receta de un usuario para el Userid:' + req.params.userId + ' y recipeId' + req.params.recipeId
router.get('/:userId/recipes/:recipeId', auth.authenticateToken, recipeController.getRecipeById);

//Actualizar receta de un usuario para el Userid:' + req.params.userId + ' y recipeId' + req.params.recipeId
router.put('/:userId/recipes/:recipeId', auth.authenticateToken, recipeController.updateRecipeById);

//Eliminar receta de un usuario para el Userid:' + req.params.userId + ' y recipeId' + req.params.recipeId
router.delete('/:userId/recipes/:recipeId', auth.authenticateToken, recipeController.deleteRecipeById);

router.post('/image', filesController.uploadProfileImage);

module.exports = router; 