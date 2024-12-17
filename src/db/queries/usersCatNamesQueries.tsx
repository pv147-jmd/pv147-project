'use server';
import { eq, and } from 'drizzle-orm';

import { usersCatNames } from '@/db/schema/usersCatNames';

import { db } from '..';

export const getUsersCatNames = async (userId: number) =>
	db.query.usersCatNames.findMany({
		where: (usersCatNames, { eq }) => eq(usersCatNames.userId, userId)
	});

export const addPictureToUsersCat = async (
	userId: number,
	catNameId: number,
	picture: string
) =>
	db
		.update(usersCatNames)
		.set({ pictureUrl: picture })
		.where(
			and(
				eq(usersCatNames.userId, userId),
				eq(usersCatNames.catNameId, catNameId)
			)
		);
