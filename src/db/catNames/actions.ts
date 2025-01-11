'use server';

import { eq, like } from 'drizzle-orm';

import { db } from '@/db';

import { catNames } from '../schema/catNames';

export const searchCatNames = async (searchTerm: string) => {
	if (!searchTerm) return [];
	return await db.query.catNames.findMany({
		where: fields => like(fields.name, `${searchTerm}%`)
	});
};

export const addCatName = async (name: string, userId: string) => {
	const [insertedId] = await db
		.insert(catNames)
		.values({
			name,
			userId
		})
		.returning({ id: catNames.id });

	if (!insertedId) {
		throw new Error('Nepodařilo se vložit nové jméno.');
	}

	return insertedId.id;
};

export const getCatNameById = async (id: number) =>
	await db.query.catNames.findFirst({
		where: eq(catNames.id, id)
	});
