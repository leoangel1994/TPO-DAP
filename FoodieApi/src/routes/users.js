const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send({ message: 'Registrar un usuario público utilizando Google' });
});

router.get('/:id', (req, res) => {
  res.send({ message: 'Obtener datos del perfil de un usuario público para el id:' + req.params.id });
});

router.put('/:id', (req, res) => {
  res.send({ message: 'Editar los datos del perfil del usuario público para el id:' + req.params.id });
});

router.delete('/:id', (req, res) => {
  res.send({ message: 'Dar de baja la cuenta de un usuario público para el id:' + req.params.id });
});

router.post('/:id/favourites', (req, res) => {
  res.send({ message: 'Guarda una receta en favoritos para el user id: ' + req.params.id });
});

router.delete('/:id/favourites', (req, res) => {
  res.send({ message: 'Eliminar receta guardada en favoritos para el user id:' + req.params.id });
});

router.get('/:id/favourites', (req, res) => {
  res.send({ message: 'Muestra una lista de recetas favoritas para el user id: ' + req.params.id });
});

router.post('/login', (req, res) => {
  res.send({ message: 'Iniciar sesión' });
});

router.post('/logout', (req, res) => {
  res.send({ message: 'Cerrar sesión' });
});

router.get('/:id/recipes/:recipeId', (req, res) => {
  res.send({ message: 'Obtener receta de un usuario para el Userid:' + req.params.id + ' y recipeId' + req.params.recipeId});
});

router.put('/:id/recipes/:recipeId', (req, res) => {
  res.send({ message: 'Actualizar receta de un usuario para el Userid:' + req.params.id + ' y recipeId' + req.params.recipeId});
});

router.delete('/:id/recipes/:recipeId', (req, res) => {
  res.send({ message: 'Eliminar receta de un usuario para el Userid:' + req.params.id + ' y recipeId' + req.params.recipeId});
});


module.exports = router;
