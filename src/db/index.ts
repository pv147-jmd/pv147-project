import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { dayRuns, runsRelations } from '@/db/schema/dayRuns';
import { users, usersRelations } from '@/db/schema/users';

const client = createClient({
	url: process.env.TURSO_DB_DATABASE_URL!,
	authToken: process.env.TURSO_DB_AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		users,
		dayRuns,

		// relations
		usersRelations,
		runsRelations
	}
});
