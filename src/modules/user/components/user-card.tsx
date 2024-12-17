import { LabeledItem } from '@/components/labeled-item';
import { db } from '@/db';
import { type User } from '@/db/schema/users';

export const UserCard = async ({ user }: { user: User }) => {
	const runs = await db.query.dayRuns.findMany({
		where: (runs, { eq }) => eq(runs.userId, user.id)
	});

	return (
		<div className="flex flex-col gap-y-4">
			<div className="grid gap-10 rounded-md bg-white px-8 py-4 md:grid-cols-2 lg:grid-cols-4">
				<LabeledItem label="User">{user.name}</LabeledItem>
				<LabeledItem label="ID">{user.id}</LabeledItem>
			</div>
			<div>
				<h2 className="text-2xl">Runs</h2>
				<ol className="flex flex-col gap-y-2">
					{runs.map(run => (
						<li
							key={run.id}
							className="relative grid gap-4 rounded-md bg-white px-8 py-4 md:grid-cols-3"
						>
							<LabeledItem label="Date">{run.date}</LabeledItem>
							<LabeledItem label="Count">{run.count}</LabeledItem>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
};
