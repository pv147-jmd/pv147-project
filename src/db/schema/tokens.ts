import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';


export const verificationTokens = sqliteTable('verificationTokens', {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: "timestamp_ms" }).notNull(),
});



