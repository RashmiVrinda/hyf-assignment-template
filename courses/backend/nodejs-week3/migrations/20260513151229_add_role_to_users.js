export function up(knex) {
  return knex.schema.table("users", (table) => {
    table.string("role").defaultTo("user");
  });
}

export function down(knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("role");
  });
}