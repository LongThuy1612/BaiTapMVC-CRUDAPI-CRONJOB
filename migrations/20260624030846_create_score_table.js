/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('Score', table => {
    table.increments('id').primary();
    
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('User.id').onDelete('CASCADE');

    table.integer('class_id').unsigned().notNullable();
    table.foreign('class_id').references('Class.id').onDelete('CASCADE');

    table.decimal('score', 10, 2).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('Score');
};
