/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
    await knex.schema
    .createTable('users' , (table) => {
        table.string('id' , 64).primary();
        table.string('name' , 64).notNullable();
        table.string('email' , 64).notNullable();
    })
    .createTable('boards' , (table) => {
        table.string('id' , 64).primary();
        table.string('name' , 64).notNullable();
        table.string('description' , 128);
        table.string('user_id' , 64).notNullable();
        table.foreign('user_id').references('users.id');
    })
    .createTable('tasks' , (table) => {
        table.string('id' , 64).primary();
        table.string('title' , 64).notNullable();
        table.string('description' , 128);
        table.enu('status' , ['OPEN' , 'IN_PROGRESS' , 'DONE']).defaultTo('OPEN');
        table.string('board_id' , 64).notNullable();
        table.foreign('board_id').references('boards.id');
    })

    console.log('Tables created');
}

exports.down = async (knex) => {
    await knex.schema
    .dropTable('tasks')
    .dropTable('boards')
    .dropTable('users')

    console.log('Tables dropped');
}