import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const sessions = sqliteTable('sessions', {
    id: text('id'),
    sessionToken: text('session_token').notNull().unique().primaryKey(),
    userId: text('user_id').notNull(),
    expires: integer('expires', { mode: 'timestamp' }).notNull(),
});
