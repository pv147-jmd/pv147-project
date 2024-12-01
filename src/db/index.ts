import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { dayRuns, giftsRelations } from '@/db/schema/dayRuns';
import { users, usersRelations } from '@/db/schema/users';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		users,
		gifts: dayRuns,

		// relations
		usersRelations,
		giftsRelations
	}
});
