import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { dayRuns } from '@/db/schema/dayRuns';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	nickname: text('nickname'),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: text('created_at').default('CURRENT_TIMESTAMP')
});

export const usersRelations = relations(users, ({ many }) => ({
	runs: many(dayRuns)
}));

export type User = typeof users.$inferSelect;
