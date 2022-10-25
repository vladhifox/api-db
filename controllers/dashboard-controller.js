const db = require('../db');
const dashboardModel = require('../models/dashboard-model');

class DashboardController {

    async get(req, res) {
        const todayDate = new Date().toLocaleDateString();

        dashboardModel.getCountsTasksAndLists(todayDate).then(lists => res.json(lists));

    }

    async getToday(req, res) {
        const todayDate = new Date().toLocaleDateString();

        dashboardModel.getAllTasksForToday(todayDate).then(lists => res.json(lists));

    }

    async getTasksCounts(req, res, next) {
        dashboardModel.getTasksCounts()
            .then(list => res.json(list))
            .catch(next);
    }
}

module.exports = new DashboardController()