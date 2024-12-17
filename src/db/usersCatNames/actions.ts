'use server';

import { db } from '@/db';
import { usersCatNames } from '../schema/usersCatNames';

export async function assignCatNameToUser(userId: number, catNameId: number) {
	try {
		await db.insert(usersCatNames).values({ userId, catNameId });
	
		return { success: true, message: 'Kočičí jméno přiřazeno' };
	} catch (error) {
		console.error('Chyba při přiřazování jména:', error);
		throw new Error('Nepodařilo se přiřadit kočičí jméno.');
	}
}
