--Part 1: Basic CRUD Operations--

--1- Insert a new user with your own name and email--
INSERT
INTO
"user" (name,
email)
values ('Rashmi',
'rashmidas@gmail.com');

--2-Insert a new task assigned to yourself with the following attributes:

--Title: "Learn SQL"
--Description: "Practice database queries"
--Status: "In Progress"
--Due date: One week from today--

INSERT
INTO
task (title,
description,
created,
updated,
due_date,
status_id)
VALUES ("Learn SQL",
"Practice database queries",
datetime('now'), 
datetime('now'),
date('now', '+7 days'),
2);

-- 3- Update the title of the task you just created to "Master SQL Basics"
UPDATE task 
SET title = 'Master SQL Basics', 
updated = datetime('now')
WHERE id = 40;

-- 4 - Change the due date of your task to two weeks from today
--Change the due date of your task to two weeks from today
UPDATE task
SET due_date = date('now', '+14 days'),
updated = datetime('now')
WHERE id = 40;

--5-Change the status of your task to "Done"
UPDATE
task
SET
status_id = 3,
updated = datetime('now')
WHERE
id = 40;
--6 Delete one of the tasks in the database (choose any task)
DELETE FROM task
WHERE id = 32;

--Part 2: Working with Relationships--

--Write SQL queries to answer the following questions:

--1-List all users who don't have any tasks assigned

SELECT u.id, u.name
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
WHERE ut.task_id IS NULL;

--2-Find all tasks with a status of "Done"

SELECT 
t.id, 
t.title, 
s.name AS status_name
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name = 'Done';

--3- Find all overdue tasks (due_date is earlier than today)
SELECT id, title, due_date
FROM task
WHERE due_date < date('now');

--Part 3: Modifying the Database Schema--

--1-Add a new column called priority to the task table with possible values: 'Low', 'Medium', 'High'. 💡 Remember to provide default values.
ALTER TABLE task ADD COLUMN priority TEXT DEFAULT 'Medium';

--2-Update some existing tasks to have different priority values
UPDATE task 
SET priority = 'High' 
WHERE id = 10;
UPDATE task 
SET priority = 'Low' 
WHERE status_id = 3;


--3-Create a new table called category with columns:

--id (PRIMARY KEY)
--name (e.g., "Work", "Personal", "Study")
--color (e.g., "red", "blue", "green")
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT
);

--4-Create a linking table called task_category to establish a many-to-many relationship between tasks and categories:

--task_id (FOREIGN KEY to task.id)
--category_id (FOREIGN KEY to category.id)
CREATE TABLE task_category ( task_id INTEGER NOT NULL,
category_id INTEGER NOT NULL,
PRIMARY KEY
(task_id,
category_id),
FOREIGN KEY
(task_id) REFERENCES task
(id) ON
DELETE
CASCADE,
FOREIGN KEY
(category_id) REFERENCES category(id) ON
DELETE
CASCADE );


--5-Insert at least 3 categories
INSERT INTO category 
(name, color) VALUES ('Work', 'red'), ('Personal', 'blue'), ('Study', 'green');

--6-Assign categories to at least 5 different tasks
INSERT INTO task_category (task_id, category_id) VALUES 
(1, 3),   
(10, 2),  
(13, 1),  
(14, 3),  
(40, 3); 

--Part 4: Advanced Queries--
--1-Find all tasks in a specific category (e.g., "Work")
SELECT t.title, c.name
FROM task t
JOIN task_category tc ON t.id = tc.task_id
JOIN category c ON tc.category_id = c.id
WHERE c.name = 'Work';

--2-List tasks ordered by priority (High to Low) and by due date (earliest first)
SELECT title, priority, due_date
FROM task
ORDER BY
CASE priority
WHEN 'High' THEN 1
WHEN 'Medium' THEN 2
WHEN 'Low' THEN 3
END ASC,
due_date ASC;

--3-Find which category has the most tasks
SELECT c.name AS category_name, COUNT(tc.task_id) AS total_tasks
FROM category c
JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.name
ORDER BY total_tasks DESC
LIMIT 1;

--4-Get all high priority tasks that are either "In Progress" or "To Do"
SELECT
 t.title AS "Task",
 t.priority AS "Priority",
 s.name AS "Status"
FROM task t
JOIN status s ON t.status_id = s.id
WHERE t.priority = 'High'
AND (s.name = 'In progress' OR s.name = 'Not started');

--5-Find users who have tasks in more than one category
SELECT 
u.name AS "User Name", 
COUNT(DISTINCT tc.category_id) AS "Category Count"
FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task t ON ut.task_id = t.id
JOIN task_category tc ON t.id = tc.task_id
GROUP BY u.name
HAVING COUNT(DISTINCT tc.category_id) > 1;







