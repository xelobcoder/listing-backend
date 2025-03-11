import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('listings');
    return knex.schema.createTable('listings', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).unique();
        table.string('title').notNullable();
        table.text('description');
        table.decimal('price', 10, 2).notNullable();
        table.enum('propertyType', ['HOUSE', 'APARTMENT', 'CONDO', 'LAND', 'TOWNHOUSE', 'MULTI_FAMILY', 'COMMERCIAL']).notNullable();
        table.integer('bedrooms').notNullable();
        table.integer('bathrooms').notNullable();
        table.integer('squareFeet');
        table.integer('lotSize');
        table.integer('yearBuilt');
        table.enum('status', ['PENDING', 'APPROVED', 'REJECTED', 'AVAILABLE', 'SOLD', 'OFF_MARKET']).defaultTo('PENDING').notNullable();
        table.string('address').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('postalCode').notNullable();
        table.string('country').notNullable();
        table.decimal('latitude', 9, 6);
        table.decimal('longitude', 9, 6);
        table.boolean('hasGarage').defaultTo(false);
        table.boolean('hasPool').defaultTo(false);
        table.boolean('hasBasement').defaultTo(false);
        table.boolean('hasFireplace').defaultTo(false);
        table.integer('parkingSpaces');
        table.enum('heatingType', ['NONE', 'GAS', 'ELECTRIC', 'WOOD', 'GEOTHERMAL', 'SOLAR']).defaultTo('NONE');
        table.enum('coolingType', ['NONE', 'CENTRAL_AIR', 'WINDOW_UNIT', 'EVAPORATIVE', 'GEOTHERMAL']).defaultTo('NONE');
        table.jsonb('imageUrls');
        table.string('videoUrl');
        table.jsonb('floorPlans');
        table.uuid('agentId').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('listings');
}