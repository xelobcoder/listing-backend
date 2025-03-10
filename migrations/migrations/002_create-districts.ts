import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('districts', (table) => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('code', 10).notNullable();
        table.integer('regionid').unsigned();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('districts');
}