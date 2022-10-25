const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard-controller');

router.get('/', dashboardController.get);
router.get('/today', dashboardController.getToday);
router.get('/lists', dashboardController.getTasksCounts);

module.exports = router;