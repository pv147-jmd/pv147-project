'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { LucideCamera, LucideUpload } from 'lucide-react';

export const QuickUploadImage = ({
	setUrl
}: {
	setUrl: (url: string) => void;
}) => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const [preview, setPreview] = useState<string | null>(null);

	const handleFileChange = async (
		data: React.ChangeEvent<HTMLInputElement>
	) => {
		if (data.target.files) {
			const file = data.target.files[0];
			setPreview(URL.createObjectURL(file));
			const response = await fetch(
				`/api/usersCatNames/upload?filename=${file.name}`,
				{
					method: 'POST',
					body: file
				}
			);

			const newBlob = await response.json();

			setUrl(newBlob.url);
			// TODO remove old
		}
	};

	const handleButtonClick = (capture?: string) => {
		if (inputFileRef.current) {
			inputFileRef.current.capture = capture ?? '';
			inputFileRef.current.click();
		}
	};

	return (
		<div className="mx-auto max-w-md rounded-md bg-white p-4">
			<h1 className="mb-4 text-xl font-bold">Nahrát fotku</h1>
			<div>
				<input
					ref={inputFileRef}
					type="file"
					accept="image/*"
					required
					className="hidden"
					onChange={handleFileChange}
				/>
				<div className="flex items-center justify-center gap-4">
					<button
						type="button"
						onClick={() => handleButtonClick()}
						className="flex h-20 w-32 items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none"
					>
						<div className="flex flex-col items-center justify-center">
							<p className="px-2 text-center">Nahrát</p>
							<LucideUpload size={24} />
						</div>
					</button>
					<button
						type="button"
						onClick={() => handleButtonClick('environment')}
						className="flex h-20 w-32 items-center justify-center rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none lg:hidden"
					>
						<div className="flex flex-col items-center justify-center">
							<p className="text-center">Vyfotit</p>
							<LucideCamera size={24} />
						</div>
					</button>
				</div>
			</div>
			{preview && (
				<div className="m-4 flex-col rounded">
					<Image
						src={preview}
						alt="Preview"
						className="mx-auto h-48 w-48 rounded object-cover"
						width={100}
						height={100}
					/>
				</div>
			)}
		</div>
	);
};
