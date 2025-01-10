import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { catNames } from '@/db/schema/catNames';
import { users } from '@/db/schema/users';

export const usersCatNames = sqliteTable('usersCatNames', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	catNameId: integer('cat_name_id')
		.references(() => catNames.id, { onDelete: 'cascade' })
		.notNull(),
	pictureUrl: text('picture_url') // Add this line to store the picture URL
});

export const usersCatNamesRelations = relations(usersCatNames, ({ one }) => ({
	user: one(users, {
		fields: [usersCatNames.userId],
		references: [users.id]
	}),
	catName: one(catNames, {
		fields: [usersCatNames.catNameId],
		references: [catNames.id]
	})
}));

export type UsersCatNames = typeof usersCatNames.$inferSelect;
