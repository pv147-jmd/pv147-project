import { LabeledItem } from '@/components/labeled-item';
import { useGiftsQuery } from '@/modules/gift/hooks/api';

import { type User } from '../schema';

export const UserCard = ({ user }: { user: User }) => {
	const { data: gifts } = useGiftsQuery();

	return (
		<div className="flex flex-col gap-y-4">
			<div className="grid gap-10 rounded-md bg-white px-8 py-4 md:grid-cols-2 lg:grid-cols-4">
				<LabeledItem label="User">{user.name}</LabeledItem>
				<LabeledItem label="Username">{user.username}</LabeledItem>
				<LabeledItem label="Role">{user.role}</LabeledItem>
				<LabeledItem label="ID">{user.id}</LabeledItem>
			</div>

			{user.role === 'user' && gifts && (
				<div className="grid gap-10 rounded-md bg-white px-8 py-4 md:grid-cols-2 lg:grid-cols-4">
					<LabeledItem label="Gifts count">{gifts.length}</LabeledItem>
				</div>
			)}
		</div>
	);
};
