import { eq, sql } from 'drizzle-orm';
import { useQuery } from '@tanstack/react-query';

import { usersCatNames } from '@/db/schema/usersCatNames';

import { db } from '..';
import { catNames } from '../schema/catNames';

type CatNameUsage = {
	name: string;
	usageCount: number;
};

export const getUsersCatNames = async (userId: string) =>
	db.query.usersCatNames.findMany({
		where: (usersCatNames, { eq }) => eq(usersCatNames.userId, userId),
		with: {
			catName: true
		}
	});

export const getUsersCatNameById = async (userCatNameId: number) =>
	db.query.usersCatNames.findFirst({
		where: (usersCatNames, { eq }) => eq(usersCatNames.id, userCatNameId)
	});

export const addPictureToUsersCat = async (
	userCatNameId: number,
	picture: string
) =>
	await db
		.update(usersCatNames)
		.set({ pictureUrl: picture })
		.where(eq(usersCatNames.id, userCatNameId));

export const getUsedCatNamesWithCount = async (): Promise<CatNameUsage[]> => {
	const result = await db
		.select({
			name: catNames.name,
			usageCount: sql`COUNT(
            ${usersCatNames.catNameId}
            )`.as('usageCount')
		})
		.from(catNames)
		.leftJoin(
			usersCatNames,
			sql`${usersCatNames.catNameId}
        =
        ${catNames.id}`
		)
		.groupBy(catNames.id).having(sql`COUNT(
        ${usersCatNames.catNameId}
        )
        >
        0`).orderBy(sql`usageCount
        DESC`);

	return result.map(row => ({
		name: row.name,
		usageCount: Number(row.usageCount)
	}));
};

export const useGetUsedCatNamesWithCount = () =>
	useQuery<CatNameUsage[]>({
		queryKey: ['usedCatNames'],
		queryFn: getUsedCatNamesWithCount
	});
