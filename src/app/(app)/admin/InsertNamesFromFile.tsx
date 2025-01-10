'use server';
import { db } from '@/db';
import { catNames } from '@/db/schema/catNames';

export const uploadNames = async (names: string) => {
	const nameList = names
		.split('\n')
		.map(name => name.trim())
		.filter(name => name);

	for (const name of nameList) {
		console.log(`Uploading name: ${name}`);
		await db.insert(catNames).values({ name, userId: "1" });
	}

	console.log('Names uploaded successfully');
};
