import { db } from '@/db';

export const getUserInDb = async (email: string, password: string) =>
	await db.query.users.findFirst({
		where: (users, { and, eq }) =>
			and(eq(users.email, email), eq(users.password, password))
	});
