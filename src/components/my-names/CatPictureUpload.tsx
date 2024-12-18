'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

import { addPictureToUsersCat } from '@/db/queries/usersCatNamesQueries';

export const CatPictureUpload = ({
	userCatNameId
}: {
	userCatNameId: number;
}) => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [blob, setBlob] = useState<PutBlobResult | null>(null);
	return (
		<div className="mx-auto max-w-md rounded-md bg-white p-4 shadow-md">
			<h1 className="mb-4 text-2xl font-bold">Nahrát novou fotku</h1>
			<form
				onSubmit={async event => {
					event.preventDefault();

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

					const newBlob = (await response.json()) as PutBlobResult;

					setBlob(newBlob);
					await addPictureToUsersCat(userCatNameId, newBlob.url);
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
				>
					Upload
				</button>
			</form>
			{blob && (
				<div className="mt-4">
					Blob url:{' '}
					<a href={blob.url} className="text-indigo-600">
						{blob.url}
					</a>
				</div>
			)}
		</div>
	);
};
