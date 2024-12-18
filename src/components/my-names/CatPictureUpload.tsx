'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { addPictureToUsersCat } from '@/db/queries/usersCatNamesQueries';

export const CatPictureUpload = ({
	userCatNameId
}: {
	userCatNameId: number;
}) => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	return (
		<div className="mx-auto max-w-md rounded-md bg-white p-4 shadow-md">
			<h1 className="mb-4 text-2xl font-bold">Nahrát novou fotku</h1>
			<form
				onSubmit={async event => {
					event.preventDefault();
					setIsLoading(true);

					if (!inputFileRef.current?.files) {
						throw new Error('No file selected');
					}

					const file = inputFileRef.current.files[0];

					const response = await fetch(
						`/api/usersCatNames/upload?filename=${file.name}`,
						{
							method: 'POST',
							body: file
						}
					);

					const newBlob = await response.json();

					addPictureToUsersCat(userCatNameId, newBlob.url);
					setIsLoading(false);
					router.refresh();
				}}
			>
				<input
					name="file"
					ref={inputFileRef}
					type="file"
					required
					className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
				/>
				<button
					type="submit"
					className="mt-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					disabled={isLoading}
				>
					{isLoading ? 'Nahrávání...' : 'Nahrát'}
				</button>
			</form>
		</div>
	);
};
