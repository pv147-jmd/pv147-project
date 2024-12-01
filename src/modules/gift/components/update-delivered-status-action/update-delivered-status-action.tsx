import { Check, Loader, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

import { type Gift } from '../../schema';

import { useUpdateGiftDeliveredMutation } from './hooks';

export const UpdateDeliveredStatusAction = ({
	giftId,
	delivered
}: {
	giftId: number;
	delivered: boolean;
}) => {
	const mutation = useUpdateGiftDeliveredMutation();

	const Icon = mutation.isPending ? Loader : delivered ? X : Check;

	return (
		<Button
			onClick={() => {
				mutation.mutate(
					{
						id: giftId,
						delivered: !delivered
					},
					{
						onSuccess: () => {
							toast.success(`Gift ${!delivered ? '' : 'not'} delivered!`);
						}
					}
				);
			}}
		>
			<Icon size={16} className={cn(mutation.isPending && 'animate-spin')} />
		</Button>
	);
};
