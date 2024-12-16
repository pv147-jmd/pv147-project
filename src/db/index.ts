import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { catNames, catNamesRelations } from '@/db/schema/catNames';
import { users, usersRelations } from '@/db/schema/users';
import { usersCatNames, usersCatNamesRelations } from './schema/usersCatNames';

const client = createClient({
	url: process.env.TURSO_DB_DATABASE_URL!,
	authToken: process.env.TURSO_DB_AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		users,
		catNames,
		usersCatNames,

		// relations
		usersRelations,
		catNamesRelations,
		usersCatNamesRelations
	}
});
