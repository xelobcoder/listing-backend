import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('regions', (table) => {
        table.increments('id').primary().unsigned();
        table.string('name', 255).notNullable().unique();
        table.string('regioncode', 5).notNullable().unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('regions');
}