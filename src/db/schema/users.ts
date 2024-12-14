import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { catNames } from '@/db/schema/catNames';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	createdCatNames: many(catNames)
}));

export type User = typeof users.$inferSelect;
