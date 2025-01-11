import React from 'react';
import Image from 'next/image';

import { CatPictureUpload } from '@/components/my-names/CatPictureUpload';

export const EditMyCat = ({
	userCatName,
	name
}: {
	userCatName: { id: number; pictureUrl: string; userId: string };
	name: string;
}) => (
	<div className="container w-fit rounded-md bg-white p-4 shadow-md">
		<h1 className="mb-4 text-2xl font-bold">Detail kočky</h1>
		<div className="mb-4 flex w-fit">
			<div className="items-start p-4">
				<div className="block text-sm font-medium text-gray-700">Jméno:</div>
				<div className="ml-2 mt-1">{name}</div>
			</div>
			{userCatName.pictureUrl !== '' && (
				<Image
					src={userCatName.pictureUrl}
					alt="Cat"
					className="sm:w-54 ml-4 h-auto object-cover md:w-64"
					width={200}
					height={200}
				/>
			)}
		</div>
		<CatPictureUpload userCatNameId={userCatName.id} />
	</div>
);
