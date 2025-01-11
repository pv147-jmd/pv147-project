import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { catNames, catNamesRelations } from '@/db/schema/catNames';
import { users } from '@/db/schema/users';

import { usersCatNames, usersCatNamesRelations } from './schema/usersCatNames';
import { sessions } from './schema/sessions';
import { verificationTokens } from './schema/tokens';
import { accounts } from './schema/accounts';

const client = createClient({
	url: process.env.TURSO_DB_DATABASE_URL!,
	authToken: process.env.TURSO_DB_AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		users,
		catNames,
		usersCatNames,
		sessions,
		verificationTokens,
		accounts,

		// relations
		// usersRelations,
		catNamesRelations,
		usersCatNamesRelations
	}
});
