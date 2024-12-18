import { debug } from 'console';

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { type JWT } from 'next-auth/jwt';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '@/db';
import {
	accounts,
	sessions,
	users,
	verificationTokens
} from '@/db/schema/users';
import { fetchUser } from '@/auth/credentials-user';
import { getUser } from '@/auth/session-user';
import { getUserInDb } from '@/db/queries/userQueries';

export const authOptions = {
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens
	}),
	pages: {
		signIn: '/login'
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
					scope: 'openid email profile'
				}
			}
		})
		// CredentialsProvider({
		// 	// The name to display on the sign in form (e.g. "Sign in with...")
		// 	name: 'Credentials',
		// 	// `credentials` is used to generate a form on the sign in page.
		// 	// You can specify which fields should be submitted, by adding keys to the `credentials` object.
		// 	// e.g. domain, username, password, 2FA token, etc.
		// 	// You can pass any HTML attribute to the <input> tag through the object.
		// 	credentials: {
		// 		email: { label: 'Email', type: 'text' },
		// 		password: { label: 'Password', type: 'password' }
		// 	},
		// 	// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
		// 	async authorize(credentials, req) {
		// 		try {
		// 			const user = await getUserInDb(
		// 				String(credentials.email),
		// 				String(credentials.password)
		// 			);
		// 			if (user) {
		// 				return {
		// 					id: user.id,
		// 					name: user.name,
		// 					email: user.email,
		// 					emailVerified: user.emailVerified,
		// 					image: user.image
		// 				};
		// 			}
		// 			return null;
		// 		} catch (error) {
		// 			console.error('Error during authentication', error);
		// 			return null;
		// 		}
		// 	}
		// })
	],
	debug: true
};

export const { handlers, auth, signOut, signIn } = NextAuth(authOptions);
