const express = require('express');
const router = express.Router();

const todosController = require('../controller/todosController');

// READ
router.get('/', todosController.index);

// CREATE
router.post('/create', todosController.create);

// Edit
router.get('/edit/:id', todosController.edit);

// UPDATE
router.put('/:id', todosController.update);

// DELETE
router.delete('/:id', todosController.delete);

module.exports = router;