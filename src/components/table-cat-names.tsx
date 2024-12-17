'use client';

import { assignCatNameToUser } from '@/db/usersCatNames/actions';
import React from 'react';

type CatName = {
	id: number;
	name: string;
};

type TableCatNamesProps = {
	catNames: CatName[];
	userId: number;
};

export const TableCatNames: React.FC<TableCatNamesProps> = ({ catNames, userId }) => {
	const handleAssign = async (catNameId: number) => {
		try {
			const result = await assignCatNameToUser(userId, catNameId);
			if (result?.success) {
				alert(`Kočičí jméno bylo přiřazeno uživateli.`);
			} else {
				alert('Nepodařilo se přiřadit jméno.');
			}
		} catch (error) {
			console.error('Chyba při přiřazování jména:', error);
			alert('Nepodařilo se přiřadit jméno.');
		}
	};
	
	return (
		<table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm">
			<thead>
			<tr className="bg-gray-100">
				<th className="border border-gray-300 px-4 py-2 text-left">#</th>
				<th className="border border-gray-300 px-4 py-2 text-left">Jméno</th>
				<th className="border border-gray-300 px-4 py-2 text-left">Akce</th>
			</tr>
			</thead>
			<tbody>
			{catNames.length > 0 ? (
				catNames.map((catName, index) => (
				<tr key={catName.id} className="hover:bg-gray-50">
					<td className="border border-gray-300 px-4 py-2">{index + 1}</td>
					<td className="border border-gray-300 px-4 py-2">{catName.name}</td>
					<td className="border border-gray-300 px-4 py-2">
						<button
							onClick={() => handleAssign(catName.id)}
							className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							Přidat do mých jmen
						</button>
					</td>
				</tr>
				))
			) : (
				<tr>
				<td
					colSpan={3}
					className="border border-gray-300 px-4 py-2 text-center text-gray-500"
				>
					Žádná jména nejsou k dispozici.
				</td>
				</tr>
			)}
			</tbody>
		</table>
	)
};