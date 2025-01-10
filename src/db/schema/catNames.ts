import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';

export const catNames = sqliteTable('catNames', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	userId: text('user_id')
});

export const catNamesRelations = relations(catNames, ({ one }) => ({
	createdByUser: one(users, {
		fields: [catNames.userId],
		references: [users.id]
	})
}));

export type CatNames = typeof catNames.$inferSelect;
