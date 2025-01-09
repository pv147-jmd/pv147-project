import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';


export const accounts = sqliteTable('accounts', {
    id: text('id').primaryKey(),
    userId: text('userId').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    accessToken: text('accessToken'),
    refreshToken: text('refreshToken'),
    expiresAt: integer('expiresAt'),
    tokenType: text('tokenType'),
    scope: text('scope'),
    idToken: text('idToken'),
});
