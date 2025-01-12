'use client';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export const CatCart = ({
	userCatId,
	catName,
	pictureUrl
}: {
	userCatId: number;
	catName: string;
	pictureUrl: string | null;
}) => (
	<button
		className="cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-md hover:shadow-lg"
		onClick={() => redirect(`/my-names/${userCatId}`)}
	>
		{pictureUrl ? (
			<div className="relative mx-auto h-48 w-48">
				<Image src={pictureUrl} alt="Cat" className="object-cover" fill />
			</div>
		) : (
			<div className="mx-auto flex h-48 w-48 items-center justify-center bg-gray-200">
				No picture
			</div>
		)}
		<div className="mt-4 text-center text-xl font-semibold">{catName}</div>
	</button>
);
