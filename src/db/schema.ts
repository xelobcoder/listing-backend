import {
    pgTable, varchar, uuid, text, decimal, integer, boolean, jsonb, timestamp, pgEnum, index
} from 'drizzle-orm/pg-core';

const roleEnum = pgEnum('role', ['USER', 'AGENT']);
const propertyTypeEnum = pgEnum('propertyType', ['HOUSE', 'APARTMENT', 'CONDO', 'LAND', 'TOWNHOUSE', 'MULTI_FAMILY', 'COMMERCIAL']);
const statusEnum = pgEnum('status', ['AVAILABLE', 'SOLD', 'PENDING', 'OFF_MARKET']);
const heatingTypeEnum = pgEnum('heatingType', ['NONE', 'GAS', 'ELECTRIC', 'WOOD', 'GEOTHERMAL', 'SOLAR']);
const coolingTypeEnum = pgEnum('coolingType', ['NONE', 'CENTRAL_AIR', 'WINDOW_UNIT', 'EVAPORATIVE', 'GEOTHERMAL']);
const transactionStatusEnum = pgEnum('transactionStatus', ['PENDING', 'PAID', 'FAILED']);


export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    password: varchar('password').notNull(),
    role: roleEnum('role').default('USER'),
    createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
    emailIdx: index('users_email_idx').on(table.email),
}));

export const listings = pgTable('listings', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title').notNull(),
    description: text('description'),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    propertyType: propertyTypeEnum('propertyType').notNull(),
    bedrooms: integer('bedrooms').notNull(),
    bathrooms: integer('bathrooms').notNull(),
    squareFeet: integer('squareFeet'),
    lotSize: integer('lotSize'),
    yearBuilt: integer('yearBuilt'),
    status: statusEnum('status').default('PENDING'),
    address: varchar('address').notNull(),
    city: varchar('city').notNull(),
    state: varchar('state').notNull(),
    postalCode: varchar('postalCode').notNull(),
    country: varchar('country').notNull(),
    latitude: decimal('latitude', { precision: 9, scale: 6 }),
    longitude: decimal('longitude', { precision: 9, scale: 6 }),
    hasGarage: boolean('hasGarage').default(false),
    hasPool: boolean('hasPool').default(false),
    hasBasement: boolean('hasBasement').default(false),
    hasFireplace: boolean('hasFireplace').default(false),
    parkingSpaces: integer('parkingSpaces'),
    heatingType: heatingTypeEnum('heatingType').default('NONE'),
    coolingType: coolingTypeEnum('coolingType').default('NONE'),
    imageUrls: jsonb('imageUrls'),
    videoUrl: varchar('videoUrl'),
    floorPlans: jsonb('floorPlans'),
    agentId: uuid('agentId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$default(() => new Date()),
}, (table) => ({
    statusIdx: index('listings_status_idx').on(table.status),
    cityIdx: index('listings_city_idx').on(table.city),
    postalCodeIdx: index('listings_postal_code_idx').on(table.postalCode),
}));

export const transactions = pgTable('transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    listingId: uuid('listingId').notNull().references(() => listings.id, { onDelete: 'cascade' }),
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
    status: transactionStatusEnum('status').default('PENDING'),
    paymentMethod: varchar('paymentMethod').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const favorites = pgTable('favorites', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    listingId: uuid('listingId').notNull().references(() => listings.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
});

export const subscriptions = pgTable('subscriptions', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: varchar('email').notNull().unique(),
    isActive: boolean('isActive').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});
