const db = require('../db');
const listsModel = require('../models/lists-model');


class ListsController {

    async get(req, res) {
        listsModel.getAllLists().then(lists => res.json(lists));
    }

    async getListsById(req, res, next) {
        const listId = parseInt(req.params.id);

        listsModel.getListById(listId)
            .then(list => res.json(list))
            .catch(next);
    }

    async getTasksById(req, res, next) {
        const listId = parseInt(req.params.id);
        const { all } = req.query;

        listsModel.getTaskById(listId, all)
            .catch(next)
            .then(list => res.json(list));
    }

    async post(req, res, next) {
        const { title } = req.body;

        listsModel.post(title)
            .catch(next)
            .then(list => res.json(list));
    };


    async put(req, res, next) {
        const listId = parseInt(req.params.id);
        const { title } = req.body;

        listsModel.put(listId, title)
            .catch(next)
            .then(list => res.json(list));
    };

    async patch(req, res, next) {
        const listId = parseInt(req.params.id);
        const { title } = req.body;

        listsModel.put(listId, title)
            .catch(next)
            .then(list => res.json(list));
    };

    async delete(req, res, next) {
        const listId = parseInt(req.params.id);
        listsModel.delete(listId)
            .catch(next)
            .then(list => res.status(200).json(`List with ID ${listId} was deleted!`));
    }

}

module.exports = new ListsController()