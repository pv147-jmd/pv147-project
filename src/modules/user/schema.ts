import { z } from 'zod';

export const userRoleType = z.enum(['santa', 'user']);

export type UserRole = z.infer<typeof userRoleType>;

export const userSchema = z.object({
	id: z.string(),
	name: z.string(),

	username: z.string(),
	password: z.string(),

	role: z.enum(['santa', 'user'])
});

export type User = z.infer<typeof userSchema>;
