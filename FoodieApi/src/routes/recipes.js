const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();
//'Listar recetas que cumplan con los filtros de búsqueda.'
router.get('/', recipeController.getRecipesByFilters);

//'Crea una nueva receta.'
router.post('/', recipeController.createRecipeById);

//Retorna una receta para el id:' + req.params.id
router.get('/:id', recipeController.getRecipeById);

//'Actualiza una receta para el id:' + req.params.id
router.put('/:id', recipeController.updateRecipeById);

//borra una receta para el id:' + req.params.id
router.delete('/:id', recipeController.deleteRecipeById);

//Permitir que los usuarios califiquen las recetas para el id:' + req.params.id
router.post('/:id/rating', recipeController.rateRecipeById);

module.exports = router;
