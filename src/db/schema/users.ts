import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	nickname: text('nickname').unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	role: text('role').default('user'),
	createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
	emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
	image: text('image'),
	name: text('name')
});

export type User = typeof users.$inferSelect;
