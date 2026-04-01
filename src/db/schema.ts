import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),

    fistName: varchar('first_name', { length: 45 }).notNull(),
    lastName: varchar('last_name', { length: 45 }).notNull(),

    // The maximum length of an email address is 320 characters, but to be safe we can use 322 characters.
    email: varchar('email', { length: 322 }).notNull().unique(),
    emailVerifiedAt: boolean('email_verified_at').default(false).notNull(),

    // The best number for SHA-256 is 50 characters, but to be safe we can use 66 buffer.
    password: varchar('password', { length: 66 }).notNull(),
    salt: text('salt'),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),

    // This column is used to soft delete a user. If the user is deleted, we set this column to false. If the user is active, we set this column to true.
    userActive: boolean('user_active').default(true).notNull(),
});