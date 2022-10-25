const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks-controller');

router.get('/', tasksController.get);

router.get('/:id', tasksController.getById)

router.post('/', tasksController.post);

router.put('/:id', tasksController.put);

router.patch('/:id', tasksController.patch);

router.delete('/:id',tasksController.delete);

module.exports = router;