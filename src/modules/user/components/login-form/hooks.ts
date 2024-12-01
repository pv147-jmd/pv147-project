import { useMutation } from '@tanstack/react-query';

import { userSchema } from '../../schema';

import { type LoginFormSchema } from './schema';

export const useLoginMutation = () =>
	useMutation({
		mutationFn: async (data: LoginFormSchema) => {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const json = await response.json();

			if (!response.ok) {
				throw new Error(json.error);
			}

			return userSchema.parse(json);
		}
		// onSuccess: user => {
		// 	setUser(user);
		// }
	});
