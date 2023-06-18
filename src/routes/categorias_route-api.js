const express = require('express');
const categoriasController = require('../controllers/categorias-controller-api');
const router = express.Router();

router.get('/api/categorias',categoriasController.getTodasCategorias);
router.get('/api/categorias/:id', categoriasController.getCategoriaPorId);
router.delete('/api/categorias/:id', categoriasController.deleteCategoriaPorId);
router.post('/api/categorias',categoriasController.postCategoria);
router.put('/api/categorias/:id', categoriasController.putCategoriaPorId);

module.exports=router;