'use server';
import { eq, and } from 'drizzle-orm';

import { usersCatNames } from '@/db/schema/usersCatNames';

import { db } from '..';

export const getUsersCatNames = async (userId: number) =>
	db.query.usersCatNames.findMany({
		where: (usersCatNames, { eq }) => eq(usersCatNames.userId, userId)
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
