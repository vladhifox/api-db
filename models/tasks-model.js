const db = require('../db');

class TasksModel {

  getAllTasks() {
    return db.query('SELECT * FROM tasks').then(data => data.rows);
  }

  getTaskById(taskId) {
    return db.query('SELECT * FROM tasks WHERE id = $1', [taskId])
      .catch(() => {
        console.log('Task not found');
        return '';
      })
      .then(data => data.rows);
  }

  getTasksByListId(list_Id) {
    return db.query('SELECT * FROM tasks WHERE list_Id = $1', [list_Id])
      .then(data => data.rows)
      .catch(() => {
        console.log('Task not found');
        return '';
      })
  }

  post({ list_id, name, description, done, due_date }) {
    return db.query('INSERT INTO tasks (list_id, name, description, done, due_date) values ($1, $2, $3, $4, $5) RETURNING *', [list_id, name, description, done, due_date]).then(data => data.rows[0]);
  }

  put(taskId, list_id, name, description, done, due_date) {

    return db.query('UPDATE tasks set list_id = COALESCE($1, list_id), name = COALESCE($2, name), description = COALESCE($3,description), done = COALESCE($4, done), due_date = COALESCE($5,due_date) WHERE id = $6 RETURNING *', [list_id, name, description, done, due_date, taskId]).then(data => data.rows[0]);

  }

  delete(taskId) {
    return db.query('DELETE FROM tasks WHERE id = $1', [taskId]).then(data => data.rows);
  }

}


module.exports = new TasksModel()