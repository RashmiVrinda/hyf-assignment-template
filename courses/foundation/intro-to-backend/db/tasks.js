    //Setting Up the Core Application and Dependencies

    import knex from "knex";
   

    const knexInstance = knex({
    client: "sqlite3",
    connection: {
        filename:
        "/Users/rashmi/hyf-assignment-template/courses/foundation/intro-to-backend/tasks.sqlite3",
    },
    useNullAsDefault: true,
    });


    export function getTaskCount() {
    return knexInstance("task").count("id as total").first();
    }

    export function createTask({ title, description }) {
  return knexInstance("task").insert({
    title,
    description,
    created: new Date(),
    updated: new Date(),
  });
}

export function getAllTasks() {
  return knexInstance("task").select("*");
}

export function updateTask(id, updates) {
  return knexInstance("task")
    .where({ id })
    .update({
      ...updates,
      updated: new Date(),
    });
}

export function deleteTask(id) {
  return knexInstance("task").where({ id }).del();
}
