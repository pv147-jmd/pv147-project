'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';

import { usersCatNames } from '../schema/usersCatNames';

export const assignCatNameToUser = async (
	userId: string,
	catNameId: number
) => {
	try {
		await db.insert(usersCatNames).values({ userId, catNameId });

		return { success: true, message: 'Kočičí jméno přiřazeno' };
	} catch (error) {
		console.error('Chyba při přiřazování jména:', error);
		throw new Error('Nepodařilo se přiřadit kočičí jméno.');
	}
};

export const assignCatWithPictureNameToUser = async (
	userId: string,
	catNameId: number,
	pictureUrl: string
) => {
	try {
		await db.insert(usersCatNames).values({ userId, catNameId, pictureUrl });

		return { success: true, message: 'Kočičí jméno přiřazeno' };
	} catch (error) {
		console.error('Chyba při přiřazování jména:', error);
		throw new Error('Nepodařilo se přiřadit kočičí jméno.');
	}
};

export const getAssignedCatNames = async (userId: string) => {
	const userNames = await db
		.select({ nameId: usersCatNames.catNameId })
		.from(usersCatNames)
		.where(eq(usersCatNames.userId, userId));

	return userNames.map(entry => entry.nameId);
};
