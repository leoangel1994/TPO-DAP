const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Listar recetas que cumplan con los filtros de búsqueda.' });
});

router.post('/', (req, res) => {
  res.send({ message: 'Crea una nueva receta.' });
});

router.get('/:id', (req, res) => {
  res.send({ message: 'Retorna una receta para el id:' + req.params.id });
});

router.put('/:id', (req, res) => {
  res.send({ message: 'Actualiza una receta para el id:' + req.params.id });
});

router.delete('/:id', (req, res) => {
  res.send({ message: 'borra una receta para el id:' + req.params.id });
});

router.post('/:id/rating', (req, res) => {
  res.send({ message: 'Permitir que los usuarios califiquen las recetas para el id:' + req.params.id });
});

module.exports = router;
