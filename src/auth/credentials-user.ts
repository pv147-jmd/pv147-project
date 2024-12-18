import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema/users';

export const fetchUser = async () => {
	if (session?.user?.email) {
		try {
			// Fetch the user from the database using the session email
			const dbUser = await db
				.select()
				.from(users)
				.where(eq(users.email, session.user.email))
				.then(result => result[0]); // Retrieve the first matching user

			if (dbUser) {
				const appUser: User = {
					id: dbUser.id,
					email: dbUser.email
				};

				setUser(appUser); // Update the context
				localStorage.setItem('user', JSON.stringify(appUser)); // Persist user in localStorage
			}
		} catch (error) {
			console.error('Error fetching user from database:', error);
		}
	}
};
