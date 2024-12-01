'server-only';

/**
 * IMPORTANT: You should not touch this file!
 */

import { promises as fs } from 'fs';

import { z } from 'zod';

import { sleep } from '@/lib/sleep';

import { type Gift, giftSchema } from './schema';

/**
 * Parses the gifts from the JSON file, ensuring correct format
 */
const parseGifts = (input?: string) =>
	z.array(giftSchema).parse(JSON.parse(input ?? '[]'));

/**
 * Reads the gifts from the JSON file
 */
export const readGifts = async () => {
	try {
		const file = await fs.readFile(`${process.cwd()}/gifts.json`, 'utf8');
		await sleep();

		return parseGifts(file);
	} catch (error) {
		console.log('Error while parsing: ', error);

		return parseGifts();
	}
};

/**
 * Writes the `gifts` to the JSON file
 */
export const writeGifts = async (gifts: Gift[]) => {
	await fs.writeFile(`${process.cwd()}/gifts.json`, JSON.stringify(gifts));
};
