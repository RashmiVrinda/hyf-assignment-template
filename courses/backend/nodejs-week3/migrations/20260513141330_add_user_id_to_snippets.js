export function up(knex) {
      return knex.schema.table('snippets', (table) => {
        table.integer('user_id').unsigned().references('id').inTable('users');
      });
    }

    export function down(knex) {
      return knex.schema.table('snippets', (table) => {
        table.dropColumn('user_id');
      });
    }
   