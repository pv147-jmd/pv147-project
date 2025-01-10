'use client';
import React from 'react';

import { type CatNames } from '@/db/schema/catNames';

export const QuickUploadNamesSelect = ({
	selectedOption,
	setSelectedOption,
	options
}: {
	selectedOption: number;
	setSelectedOption: (id: number) => void;
	options: CatNames[];
}) => (
	<div className="mx-auto max-w-md rounded-md p-4">
		<h1 className="mb-4 text-xl font-bold">Vybrat jméno</h1>

		<div className="flex flex-wrap items-center justify-center overflow-auto">
			{options.map(option => (
				<button
					key={option.id}
					onClick={() => setSelectedOption(option.id)}
					className={`m-2 w-1/3 rounded-md p-3 ${selectedOption === option.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
					// style={{
					// 	padding: '10px 20px',
					// 	backgroundColor: selectedOption === option.id ? 'blue' : 'gray',
					// 	color: 'white',
					// 	border: 'none',
					// 	cursor: 'pointer'
					// }}
				>
					{option.name}
				</button>
			))}
		</div>
	</div>
);
