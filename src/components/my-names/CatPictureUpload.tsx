'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

import { addPictureToUsersCat } from '@/db/queries/usersCatNamesQueries';

export const CatPictureUpload = () => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [blob, setBlob] = useState<PutBlobResult | null>(null);
	return (
		<>
			<h1>Upload Cat Picture</h1>

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
					await addPictureToUsersCat(1, 1, newBlob.url);
				}}
			>
				<input name="file" ref={inputFileRef} type="file" required />
				<button type="submit">Upload</button>
			</form>
			{blob && (
				<div>
					Blob url: <a href={blob.url}>{blob.url}</a>
				</div>
			)}
		</>
	);
};
