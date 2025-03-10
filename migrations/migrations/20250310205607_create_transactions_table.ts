import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('userId').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.uuid('listingId').notNullable().references('id').inTable('listings').onDelete('CASCADE').onUpdate('CASCADE');
        table.decimal('amount', 10, 2).notNullable();
        table.enum('status', ['PENDING', 'PAID', 'FAILED']).defaultTo('PENDING');
        table.string('paymentMethod').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions');
}