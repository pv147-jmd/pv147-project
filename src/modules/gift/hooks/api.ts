import { z } from 'zod';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { giftSchema } from '../schema';

export const giftsQueryOptions = queryOptions({
	queryKey: ['gifts'],
	queryFn: async () => {
		const response = await fetch('/api/gift/list');
		const json = await response.json();

		return z.array(giftSchema).parse(json);
	},
	staleTime: Infinity
});

export const useGiftsQuery = () => useQuery(giftsQueryOptions);
