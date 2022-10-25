create TABLE lists (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255)
);

create TABLE tasks (
    id SERIAL PRIMARY KEY,
    list_id INTEGER,
    name VARCHAR(255),
    description VARCHAR(255),
    done BOOLEAN,
    due_date date,
    FOREIGN KEY (list_id) REFERENCES lists (id) ON DELETE CASCADE
);
