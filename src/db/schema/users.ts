import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	nickname: text('nickname').unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	role: text('role').default('user'),
	createdAt: text('created_at').default('CURRENT_TIMESTAMP')
});

export type User = typeof users.$inferSelect;
