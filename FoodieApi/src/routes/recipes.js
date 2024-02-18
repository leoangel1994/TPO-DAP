const express = require('express');
const recipeController = require('../controllers/recipeController');
const auth = require('../services/authService');
const filesController = require('../controllers/filesController');

const router = express.Router();
//'Listar recetas que cumplan con los filtros de búsqueda.'
router.get('/', auth.authenticateToken, recipeController.getRecipesByFilters);

//'Crea una nueva receta.'
router.post('/', auth.authenticateToken, recipeController.createRecipe);

//Retorna una receta para el id:' + req.params.id
router.get('/:id', auth.authenticateToken, recipeController.getRecipeById);

//'Actualiza una receta para el id:' + req.params.id
router.put('/:id', auth.authenticateToken, recipeController.updateRecipeById);

//borra una receta para el id:' + req.params.id
router.delete('/:id', auth.authenticateToken, recipeController.deleteRecipeById);

//Permitir que los usuarios califiquen las recetas para el id:' + req.params.id
router.post('/:id/rating', auth.authenticateToken, recipeController.rateRecipeById);

//Permitir que los usuarios suban fotos a las recetas para el id:' + req.params.id
router.post('/:id/image', auth.authenticateToken, filesController.uploadRecipeImage);

module.exports = router;
