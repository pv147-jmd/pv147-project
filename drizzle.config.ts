import type { Config } from 'drizzle-kit';

export default {
	schema: './src/db/schema',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.TURSO_DB_DATABASE_URL!,
		authToken: process.env.TURSO_DB_AUTH_TOKEN,
		secret: process.env.NEXTAUTH_SECRET
	},
	out: '.drizzle'
} satisfies Config;
