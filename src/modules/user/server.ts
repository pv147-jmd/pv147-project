'server-only';

/**
 * IMPORTANT: You should not touch this file!
 */

import { promises as fs } from 'fs';

import { z } from 'zod';

import { sleep } from '@/lib/sleep';

import { userSchema } from './schema';

/**
 * Parses users from the JSON file, ensuring correct format
 */
const parseUsers = (input?: string) =>
	z.array(userSchema).parse(JSON.parse(input ?? '[]'));

/**
 * Reads users from the JSON file
 */
export const readUsers = async () => {
	try {
		const file = await fs.readFile(`${process.cwd()}/users.json`, 'utf8');
		await sleep();

		return parseUsers(file);
	} catch (error) {
		console.log('Error while parsing: ', error);

		return parseUsers();
	}
};
