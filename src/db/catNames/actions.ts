'use server';

import { sql, like, eq, notInArray } from 'drizzle-orm';

import { db } from '@/db';

import { catNames } from '../schema/catNames';
import { usersCatNames } from '../schema/usersCatNames';

export const getAllCatNames = async () => await db.query.catNames.findMany();

export const getRandomCatNames = async () =>
	db.query.catNames.findMany({
		limit: 10,
		orderBy: sql`RANDOM()`
	});

export const getRandomCatNamesWithoutUsers = async (userId: number) => {
	const userNames = await db
		.select({ nameId: usersCatNames.catNameId })
		.from(usersCatNames)
		.where(eq(usersCatNames.userId, userId));

	const userNameIds = userNames.map(entry => entry.nameId);

	return await db.query.catNames.findMany({
		limit: 10,
		orderBy: sql`RANDOM()`,
		where: notInArray(catNames.id, userNameIds)
	});
};

export const searchCatNames = async (searchTerm: string) => {
	if (!searchTerm) return getAllCatNames();
	return await db.query.catNames.findMany({
		where: fields => like(fields.name, `${searchTerm}%`)
	});
};

export const addCatName = async (name: string, userId: number) => {
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
