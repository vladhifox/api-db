const express = require('express');
const router = express.Router();

const listsController = require('../controllers/lists-controller');

router.get('/', listsController.get);

router.get('/:id', listsController.getListsById);

router.get('/:id/tasks', listsController.getTasksById);

router.post('/', listsController.post);

router.put('/:id', listsController.put);

router.patch('/:id', listsController.patch);

router.delete('/:id', listsController.delete);

module.exports = router;