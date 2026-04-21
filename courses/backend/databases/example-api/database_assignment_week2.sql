 --Week 2 Assignment — Databases--
-- Student: RASHMI DAS--

-- Part 1, Q1
-- Count the total number of tasks in the database.

SELECT COUNT(*) FROM task


-- Part 1, Q2
-- Count tasks per user. Include users with zero tasks.

SELECT 
    u.name, 
    COUNT(t.id) AS task_count
FROM user u
LEFT JOIN task t ON u.id = t.user_id
GROUP BY u.name;


-- Part 1, Q3
-- Count tasks per status (To Do, In Progress, Done, Blocked).

SELECT s.name, COUNT (t.id) AS task_count
FROM status s
LEFT JOIN task t ON s.id = t.status_id
GROUP BY s.name;


-- Part 1, Q4
-- Find the user who has the most tasks assigned.

SELECT 
u.name, 
COUNT(t.id) AS task_count
FROM user u
JOIN task t ON u.id = t.user_id
GROUP BY u.name
ORDER BY task_count DESC
LIMIT 1;

-- Part 1, Q5
-- Average tasks per user — only for users with at least one task.

SELECT 
    CAST(COUNT(DISTINCT id) AS FLOAT) / COUNT(DISTINCT user_id) AS average_tasks
FROM task
WHERE user_id IS NOT NULL;


-- Part 1, Q6
-- Find the earliest and latest due_date across all tasks.
SELECT 
    MIN(due_date) AS earliest_date, 
    MAX(due_date) AS latest_date
FROM task;



-- Part 1, Q7
-- List categories with task counts, ordered most to least.

SELECT 
    c.name, 
    COUNT(tc.task_id) AS task_count
FROM category c
LEFT JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.name
ORDER BY task_count DESC;



-- Part 1, Q8
-- Find users who have more than 2 tasks assigned.
SELECT user.name, COUNT(task.id) AS task_count
FROM user
JOIN task ON user.id = task.user_id
GROUP BY user.name
HAVING task_count > 2;

-- Part B: SQL Injection

-- 1. Spot the Vulnerability
-- What happens with ' OR '1'='1:
-- The name filter in the subquery becomes ('') OR ('1'='1').
-- Since '1'='1' is always true, the subquery returns the IDs of every user in the database.
-- The main task query then returns ALL tasks for ALL users.
-- This is dangerous because it leads to a massive data leak where anyone can see everyone's private tasks.

-- Malicious string to delete all tasks:
-- '; DELETE FROM task; --
-- Explanation:
-- The quote and semicolon (';) force the search query to end early.
-- The attacker then adds their own command (DELETE FROM task;) to wipe the table.
-- The dashes (--) comment out the rest of the original code so the database doesn't crash before the delete happens.

-- 2. Fix the Vulnerability
-- The safest way to handle user input is using Parameterized Queries.
-- This tells the database: "The '?' is just a piece of text (data), not a command to be executed."


function getTasksByUser(userName) {
--Use a '?' placeholder instead of string interpolation--
const query = SELECT * FROM task  WHERE user_id = (SELECT id FROM user WHERE name = ?);

--Pass the user input in a separate array so it is safely escaped--
db.all(query, [userName], (err, rows) => {
if (err) {
console.error(err);
return;
}
console.log(rows);
});
}
*/
-- Part 3, Q1
-- Reassign all tasks from user 1 to user 2, then delete user 1.
-- Use BEGIN TRANSACTION and COMMIT.

BEGIN TRANSACTION;
UPDATE task
SET user_id = 2
WHERE user_id = 1;

DELETE FROM user
WHERE id = 1;
COMMIT;

-- Verify nothing went wrong:
SELECT * FROM user WHERE id = 1;
SELECT name, id FROM user WHERE id = 2;
SELECT COUNT(*) FROM task WHERE user_id = 2;



-- Part 3, Q2
-- Demonstrate a deliberate rollback.
-- Make some changes, then trigger a failure so everything rolls back.

BEGIN TRANSACTION;
-- Update all task titles to something generic
UPDATE task
SET title = 'This should not stay';

-- Delete all users
DELETE FROM user;

-- Realizing a mistake was made or a condition wasn't met
ROLLBACK;

-- Verify nothing changed:
SELECT COUNT(*) FROM user;
SELECT title FROM task LIMIT 1;



-- Part 3, Q2
-- Demonstrate a deliberate rollback.
-- Make some changes, then trigger a failure so everything rolls back.

BEGIN TRANSACTION;
-- Update all task titles to something generic
UPDATE task
SET title = 'This should not stay';

-- Delete all users
DELETE FROM user;

-- Intentional failure: manually triggering a rollback to undo the dangerous changes above
ROLLBACK;

-- Verify nothing changed:
SELECT COUNT(*) AS user_count FROM user;
SELECT title FROM task LIMIT 1;



--Part 4, Q1
--Transaction: create "Urgent" + assign tasks

BEGIN TRANSACTION;
-- 1. Create 'Urgent' (if it doesn't already exist)
INSERT OR IGNORE INTO category (name) VALUES ('Urgent');

-- 2. Link tasks 1 and 2 to 'Urgent'
INSERT OR IGNORE INTO task_category (task_id, category_id)
VALUES
(1, (SELECT id FROM category WHERE name = 'Urgent')),
(2, (SELECT id FROM category WHERE name = 'Urgent'));
COMMIT;

-- Verify the associations:
SELECT c.name AS category, t.title AS task_title
FROM category c
JOIN task_category tc ON c.id = tc.category_id
JOIN task t ON tc.task_id = t.id
WHERE c.name = 'Urgent';

SELECT
COUNT(t.id) AS total_tasks,
SUM(CASE WHEN s.name = 'Done' THEN 1 ELSE 0 END) AS completed_tasks,
SUM(CASE WHEN t.due_date < DATE('now') AND s.name != 'Done' THEN 1 ELSE 0 END) AS overdue_tasks,
COUNT(DISTINCT t.user_id) AS users_with_tasks
FROM task t
JOIN status s ON s.id = t.status_id;
