'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema/users';

type User = {
	id: number;
	email: string;
} | null;

type UserContextType = {
	user: User;
	setUser: (user: User) => void;
	logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { data: session } = useSession();
	const [user, setUser] = useState<User>(null);

	useEffect(() => {
		const fetchUser = async () => {
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

		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser)); // Load user from localStorage
		} else {
			fetchUser(); // Fetch user from the database
		}
	}, [session]);

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<UserContext.Provider value={{ user, setUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
