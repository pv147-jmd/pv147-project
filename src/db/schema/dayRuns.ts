import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';

export const dayRuns = sqliteTable('dayRuns', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	count: integer('count'),
	date: text('date'),
	userId: integer('user_id')
});

export const runsRelations = relations(dayRuns, ({ one }) => ({
	createdByUser: one(users, {
		fields: [dayRuns.userId],
		references: [users.id]
	})
}));

export type DayRun = typeof dayRuns.$inferSelect;
