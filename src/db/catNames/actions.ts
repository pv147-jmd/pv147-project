"use server";

import { db } from "@/db";
import { sql, like } from "drizzle-orm";
import { catNames } from "../schema/catNames";

export async function getAllCatNames() {
	return await db.query.catNames.findMany();
}

export async function getRandomCatNames() {
	return await db.query.catNames.findMany({
	limit: 10,
	orderBy: sql`RANDOM()`,
	});
}

export async function searchCatNames(searchTerm: string) {
	if (!searchTerm) return getAllCatNames();
	return await db.query.catNames.findMany({
	where: (fields) => like(fields.name, `${searchTerm}%`),
	});
}

export async function addCatName(name: string, userId: number) {
	const [insertedId] = await db.insert(catNames).values({
		name,
		userId,
	}).returning({ id: catNames.id });

	if (!insertedId) {
		throw new Error("Nepodařilo se vložit nové jméno.");
	}

	return insertedId.id;
}
