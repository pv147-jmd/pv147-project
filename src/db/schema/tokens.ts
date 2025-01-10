import { sqliteTable, text } from 'drizzle-orm/sqlite-core';


export const verificationTokens = sqliteTable('verificationTokens', {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: text('expires').notNull(),
});
