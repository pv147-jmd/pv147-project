// 'use client';
import React from 'react';
import Image from 'next/image';

import { CatPictureUpload } from '@/components/my-names/CatPictureUpload';
import { db } from '@/db';
import { Modal } from '@/components/modal';
import type { UsersCatNames } from '@/db/schema/usersCatNames';
import { getCatNameById } from '@/db/catNames/actions';

export const EditMyCat = ({
	userCatName,
	name
}: {
	userCatName: { id: number; pictureUrl: string; userId: string };
	name: string;
}) => (
	// const { user } = useUser();
	// const { data: session } = useSession();
	//
	// const currentUser = user ? user : session?.user ? session.user : null;
	// if (!currentUser) {
	// 	console.log(user);
	// 	console.log(session);
	// 	return <div>Not logged in</div>;
	// 	// redirect('/login');
	// }

	// if (userCatName.userId !== currentUser.id) {
	// 	return <div>Not your cat</div>;
	// }
	<div className="container w-fit rounded-md bg-white p-4 shadow-md">
		<h1 className="mb-4 text-2xl font-bold">Detail kočky</h1>
		<div className="mb-4 flex">
			<div className="items-start p-4">
				<div className="block text-sm font-medium text-gray-700">Jméno:</div>
				<div className="ml-2 mt-1">{name}</div>
			</div>
			{userCatName.pictureUrl !== '' && (
				<Image
					src={userCatName.pictureUrl}
					alt="Cat"
					className="ml-4 h-auto w-64 object-cover"
					width={200}
					height={200}
				/>
			)}
		</div>
		<CatPictureUpload userCatNameId={userCatName.id} />
	</div>
	// return (
	// <Modal
	// 	isOpen
	// 	onClose={() => {
	// 		/* TODO return back */
	// 	}}
	// >
	// <>
	// 	<h1>Edit Cat</h1>
	// 	<div>name: {name}</div>
	// 	<CatPictureUpload userCatNameId={userCatName.id} />
	// </>
	// </Modal>
);
