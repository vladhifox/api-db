const express = require('express');
const router = express.Router();

const tasksRouter = require('./task-router');
const listsRouter = require('./list-router');
const dashboardRouter = require('./dashboard-router');

router.use('/api/tasks', tasksRouter);
router.use('/api/lists', listsRouter);
router.use('/api/dashboard', dashboardRouter);
router.use('/api/collection', dashboardRouter);
router.use('/api/counts', dashboardRouter);


module.exports = router

