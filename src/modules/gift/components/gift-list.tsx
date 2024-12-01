import { LabeledItem } from '@/components/labeled-item';

const GiftListItem = async ({
	name,
	description,
	price,
	createdByName,
	delivered
}: {
	name: string;
	description: string;
	price: number;
	createdByName: string;
	delivered: boolean;
}) => {
	const deliveredStr = delivered ? 'Yes' : 'No';

	return (
		<li className="relative grid gap-4 rounded-md bg-white px-8 py-4 md:grid-cols-3">
			<LabeledItem label="Name">{name}</LabeledItem>
			<LabeledItem label="Description" className="col-span-2">
				{description}
			</LabeledItem>

			<LabeledItem label="Price">{price}</LabeledItem>
			<LabeledItem label="Created By">{createdByName}</LabeledItem>
			<LabeledItem label="Delivered">
				<div className="flex items-center gap-x-10">
					<span>{deliveredStr}</span>
				</div>
			</LabeledItem>
		</li>
	);
};

export const GiftList = async () => (
	<ul className="flex flex-col gap-y-2">
		{/*{dayRuns.map(gift => (*/}
		{/*	<GiftListItem key={gift.id} />*/}
		{/*))}*/}
	</ul>
);
