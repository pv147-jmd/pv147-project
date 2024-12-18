import { cache } from 'react';
import { redirect } from 'next/navigation';

import { auth } from './auth';

export const getSessionUser = cache(async () => {
	const session = await auth();

	if (!session?.user) {
		redirect('/login');
	}

	return session.user;
});

export const getUser = cache(async () => {
	const session = await auth();

	return session?.user;
});
