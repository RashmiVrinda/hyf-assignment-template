export function up(knex) {
  return knex.schema.createTable('tokens', (table) => {
    table.increments('id').primary(); // Unique ID for each token entry
    table.text('token').notNullable(); // The actual JWT string
    table.integer('user_id').unsigned().notNullable(); // Which user this belongs to
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    // This connects 'user_id' to the 'id' in your 'users' table
    table.foreign('user_id').references('id').inTable('users');
  });
}

export function down(knex) {
  return knex.schema.dropTable('tokens');
}