--(Fixed queries) How many tasks are in the task table?
SELECT COUNT(*) FROM task


--(Fixed queries) How many tasks in the task table do not have a valid due date?
SELECT COUNT (*) FROM task WHERE due_date IS NULL 


--Find all the tasks that are marked as done.
SELECT * FROM task WHERE status_id = 3

-- (Fixed queries) Find all the tasks that are not marked as done.
SELECT task.* FROM task JOIN status ON task.status_id = status.id WHERE status.name <> 'Done'

--Get all the tasks, sorted with the most recently created first.
SELECT * FROM task ORDER BY created DESC 

--Get the single most recently created task.
SELECT * FROM task ORDER BY created DESC LIMIT  1;


--Get the title and due date of all tasks where the title or description contains database.
SELECT title, due_date FROM task WHERE title LIKE '%database%' or description LIKE '%database%';


--(fixed queries) Get the title and status (as text) of all tasks.
SELECT  status.name, COUNT(task.id) AS task_count FROM status LEFT JOIN task  ON status.id = task.status_id GROUP BY status.id ORDER BY task_count DESC;

--Get the name of each status, along with a count of how many tasks have that status.
SELECT user.name, COUNT (task.id) FROM user JOIN task ON user.id = task.user_id JOIN status ON task.status_id = status.id WHERE status.name = 'Done' GROUP BY user.id;

--Get the names of all statuses, sorted by the status with most tasks first.
SELECT status.name, COUNT(task.id) AS task_count FROM status LEFT JOIN task ON status.id = task.status_id GROUP BY status.id ORDER BY task_count DESC;