const { json } = require('express');
const db = require('../db');

class DashboardsModel {

    getCountsTasksAndLists(nowDate) {
        const promise1 = db.query(`
            SELECT COUNT(*)::int AS today 
            FROM tasks 
            WHERE due_date <=$1 AND done = false`,
            [nowDate]).then(data => data.rows[0].today);

        const promise2 = db.query(`
            SELECT lists.id, lists.title, COUNT(tasks.done)::int AS undone 
            FROM tasks 
            RIGHT JOIN lists ON lists.id = tasks.list_id AND tasks.done = false 
            GROUP BY lists.id, lists.title 
            ORDER BY lists.id`).then(data => data.rows);

        const promise3 = db.query(`
            SELECT tasks.id 
            FROM tasks 
            WHERE due_date <=$1 AND done = false`,
            [nowDate]).then(data => data.rows);    

        return Promise.all([promise1, promise2, promise3]).then(([today, lists, tasks]) => ({ today, lists, tasks }));
    }

    getAllTasksForToday(nowDate) {
        return db.query(`
            SELECT tasks.id, tasks.due_date, tasks.done, tasks.name, tasks.description, lists.id AS list_id, lists.title 
            FROM tasks JOIN lists ON tasks.list_id = lists.id 
            WHERE due_date <= $1 AND done = false
            GROUP BY tasks.id, tasks.due_date, tasks.name, tasks.description, lists.id, lists.title
            ORDER BY tasks.due_date, lists.title`,
            [nowDate]).then(data => data.rows);
    }

    getTasksCounts() {
       
        // return db.query(`
        //         SELECT lists.id, lists.title, COUNT(CASE
        //             WHEN tasks.done = false THEN 1
        //             ELSE NULL
        //             END)::int AS undone, 
        //             COUNT(CASE
        //             WHEN tasks.done = true THEN 1
        //             ELSE NULL
        //             END)::int AS done  
        //         FROM tasks 
        //         RIGHT JOIN lists ON lists.id = tasks.list_id 
        //         GROUP BY lists.id, lists.title 
        //         ORDER BY lists.id`).then(data => data.rows);


        return db.query(`
                SELECT lists.id, lists.title, COUNT(tasks.id)::int AS all_tasks, 
                    SUM(CASE
                            WHEN tasks.done = true THEN 1
                            ELSE 0
                            END)::int AS done_tasks  
                FROM tasks 
                RIGHT JOIN lists ON lists.id = tasks.list_id 
                GROUP BY lists.id, lists.title 
                ORDER BY lists.id`).then(data => data.rows);

    }
}

module.exports = new DashboardsModel();