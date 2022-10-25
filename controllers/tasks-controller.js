const db = require('../db');
const tasksModel = require('../models/tasks-model');

class TasksController {

    async get(req, res) {
        const listId = parseInt(req.query.listId);

        if (listId) {
            tasksModel.getTasksByListId(listId).then(tasks => res.json(tasks));
        } else {
            tasksModel.getAllTasks().then(tasks => res.json(tasks));
        }

    }

    async getById(req, res, next) {
        const taskId = parseInt(req.params.id);

        tasksModel.getTaskById(taskId)
            .then(task => res.json(task))
            .catch(next);
    }

    async post(req, res, next) {        
        const objNewTask = req.body;

        if (objNewTask.list_id === undefined) {
            return res.status('400').json({ 'Error': 'List ID not found' });
        }
        
        tasksModel.post(objNewTask)            
            .then(task => res.json(task))
            .catch(next);
    }; // curl localhost:3000/tasks -d '{"name":"Delete task"}' -H "Content-type:application/json"


    async put(req, res, next) {
        const taskId = parseInt(req.params.id);
        let { list_id, name, description, done, due_date } = req.body;

        if (list_id === undefined) {
            return res.status('400').json({ 'Error': 'List ID not found' });
        }

        if (name === undefined) {
            name = '';
        }

        if (description === undefined) {
            description = '';
        }

        if (done === undefined) {
            done = false;
        }

        if (due_date === undefined) {
            due_date = null;
        }

        tasksModel.put(taskId, list_id, name, description, done, due_date)            
            .then(task => res.json(task))
            .catch(next);
    }; // curl localhost:3000/tasks/1 -d '{"name":"Delete task"}' -H "Content-type:application/json"

    async patch(req, res, next) {
        const taskId = parseInt(req.params.id);
        const { list_id, name, description, done, due_date } = req.body;

        tasksModel.put(taskId, list_id, name, description, done, due_date)
            .then(task => res.json(task))
            .catch(next);
    }; // http://localhost:3000/tasks/1  {"done": "true"} -H "Content-type:application/json"

    async delete(req, res, next) {
        const taskId = parseInt(req.params.id);
        tasksModel.delete(taskId)
            .then(task => res.status(200).json('OK'))
            .catch(next);
    }

}

module.exports = new TasksController();