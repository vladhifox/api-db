// Usage
// sudo -u postgres psql # connect to db using system user postgres

// Создать базу данных:
//create database <database_name>;

// Создать пользователя:
// create user <username>;

// Включить для пользователя доступ по паролю:
// alter user <username> with encrypted password '<password>';

// Дать пользователю вся права на работу с новой базой данных <database_name>:
// grant all privileges on database <database_name> to <username>;

// Выйти с режима postgres
// exit;

// Подключиться к базе данных с терминала
// psql -h 127.0.0.1 db_test db_user;

// Далее, уже внутри БД создаём таблицы...

// const { Client } = require('pg')

// const client = new Client({
//     user: 'intern',
//     password: '123450',  
//     host: '127.0.0.1',
//     database: 'todolist' 
// });

// client.connect();

const Pool = require('pg').Pool;
const pool = new Pool({
    //user: 'intern',
    user: 'postgres',
    //password: '123450',
    password: '123',
    host: '127.0.0.1',
    database: 'todolist',
    port: '5432'
});

//pool.query('SELECT * FROM items')
//.then(res => console.log(res.rows));

module.exports = pool;

// Create List 
//{"title": "FR"}

//Create Task
//{"list_id": 1, "name": "Task 1", "description": "New task", "done": false, "due_date": "2022-08-11"}