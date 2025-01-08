import { sql, like, eq, notInArray } from 'drizzle-orm';
import { useQuery } from '@tanstack/react-query';

import { db } from '@/db';

import { catNames } from '../schema/catNames';
import { usersCatNames } from '../schema/usersCatNames';

export type CatName = {
	id: number;
	name: string;
	userId: number | null;
};

export const getAllCatNames = async (): Promise<CatName[]> =>
	await db.query.catNames.findMany();

export const useAllCatNames = () =>
	useQuery<CatName[]>({
		queryKey: ['allCatNames'],
		queryFn: getAllCatNames
	});

export const getTenRandomCatNames = async (
	userId: number = -1
): Promise<CatName[]> => {
	if (userId !== -1) {
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
	}

	return await db.query.catNames.findMany({
		limit: 10,
		orderBy: sql`RANDOM()`
	});
};

export const useTenRandomCatNames = (userId: number = -1) =>
	useQuery<CatName[]>({
		queryKey: ['tenRandomCatNames'],
		queryFn: () => getTenRandomCatNames(userId),
		refetchOnWindowFocus: false
	});

export const searchCatNames = async (
	searchTerm: string
): Promise<CatName[]> => {
	if (!searchTerm) return getAllCatNames();
	return await db.query.catNames.findMany({
		where: fields => like(fields.name, `${searchTerm}%`)
	});
}
	await db.query.catNames.findMany();

export const useSearchCatNames = (searchTerm: string) =>
	useQuery<CatName[]>({
		queryKey: ['searchCatNames'],
		queryFn: () => searchCatNames(searchTerm)
	});

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

export const getCatNameById = async (id: number) =>
	await db.query.catNames.findFirst({
		where: eq(catNames.id, id)
	});
