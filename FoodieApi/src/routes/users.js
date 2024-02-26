const express = require('express');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const authController = require('../controllers/authController');
const filesController = require('../controllers/filesController');
const auth = require('../services/authService');
const router = express.Router();

//Obtener datos del perfil del usuario logueado
router.get('/', auth.authenticateToken, userController.getUserById);

//Obtener datos del perfil del usuario logueado por id
router.get('/profile/:id', auth.authenticateToken, userController.getUserById);

//Editar los datos del perfil del usuario logueado
router.put('/', auth.authenticateToken, userController.updateUserById);

//Dar de baja la cuenta del usuario logueado
router.delete('/', auth.authenticateToken, userController.deleteUserById);

//User Favourites
//Guarda una receta en favoritos para el user id: ' + req.params.userId
router.post('/favourites/:recipeId', auth.authenticateToken, userController.saveFavoriteRecipe);

//Eliminar receta guardada en favoritos para el user id:' + req.params.userId
router.delete('/favourites/:recipeId', auth.authenticateToken, userController.removeFavoriteRecipe);

//'Muestra una lista de recetas favoritas para el user id: ' + req.params.userId
router.get('/favourites', auth.authenticateToken, userController.getFavoriteRecipes);

//Iniciar sesión
router.post('/login', authController.login);

//Cerrar sesión
router.post('/logout', auth.authenticateToken, authController.logout);

//Refrescar token
router.post('/refreshToken', authController.refreshToken);

//Obtener recetas creadas por el usuario logueado
router.get('/recipes', auth.authenticateToken, recipeController.getUserRecipes);

//subir imagen de perfil del usuario logueado
router.post('/image', filesController.uploadProfileImage);

module.exports = router; 