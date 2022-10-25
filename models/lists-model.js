const db = require('../db');

class ListsModel {

  getAllLists() {
    return db.query('SELECT * FROM lists ORDER BY lists.title').then(data => data.rows);
  }

  getListById(listId) {
    return db.query('SELECT * FROM lists WHERE id = $1', [listId]).then(data => data.rows);
  }

  getTaskById(list_id, all) {

    if (all === 'true') {
      return db.query('SELECT * FROM tasks WHERE list_id = $1', [list_id]).then(data => data.rows);
    } else {
      return db.query('SELECT * FROM tasks WHERE list_id = $1 AND done = false', [list_id]).then(data => data.rows);
    }

  }

  post(title) {
    return db.query('INSERT INTO lists (title) values ($1) RETURNING *', [title]).then(data => data.rows);
  }

  put(listId, title) {
    return db.query('UPDATE lists set title = $2 WHERE id = $1 RETURNING *', [listId, title]).then(data => data.rows);
  }

  delete(listId) {
    return db.query('DELETE FROM lists WHERE id = $1', [listId]).then(data => data.rows);
  }

}


module.exports = new ListsModel();