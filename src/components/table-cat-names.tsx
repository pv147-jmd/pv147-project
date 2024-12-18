'use client';

import { useUser } from '@/context/UserContext';
import { assignCatNameToUser, getAssignedCatNames } from '@/db/usersCatNames/actions';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

type CatName = {
	id: number;
	name: string;
};

type TableCatNamesProps = {
	catNames: CatName[];
	userId: number;
};

export const TableCatNames: React.FC<TableCatNamesProps> = ({ catNames, userId }) => {
	const { user } = useUser();
	const { data: session } = useSession();
	
	const [assignedCatNames, setAssignedCatNames] = useState<number[]>([]);
	
	const updateAssignedCatNames = async () => {
		try {
			const names = await getAssignedCatNames(userId);
			setAssignedCatNames(names);
		} catch (error) {
			console.error('Error fetching assigned cat names:', error);
		}
	};

	const handleAssign = async (catNameId: number) => {
		try {
			await assignCatNameToUser(userId, catNameId);
		} catch (error) {
			console.error('Chyba při přiřazování jména:', error);
		}
		updateAssignedCatNames();
	};

	React.useEffect(() => {
		if (userId) {
			updateAssignedCatNames();
		}
	}, [userId]);

	return (
		<table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm">
			<thead>
			<tr className="bg-gray-100">
				<th className="border border-gray-300 px-4 py-2 text-left w-48">#</th>
				<th className="border border-gray-300 px-4 py-2 text-left">Jméno</th>
				{(user || session?.user) && (
					<th className="border border-gray-300 px-4 py-2 text-left">Akce</th>
				)}
			</tr>
			</thead>
			<tbody>
			{catNames.length > 0 ? (
				catNames.map((catName, index) => (
				<tr key={catName.id} className="hover:bg-gray-50">
					<td className="border border-gray-300 px-4 py-2 w-48">{index + 1}</td>
					<td className="border border-gray-300 px-4 py-2">{catName.name}</td>

					{(user || session?.user) && (
						<td className="border border-gray-300 px-4 py-2">
							{assignedCatNames.includes(catName.id) ? (
								<button
									className="rounded bg-gray-400 px-4 py-2 text-white cursor-not-allowed"
									disabled
								>
									Přidáno
								</button>
							) : (
								<button
									onClick={() => handleAssign(catName.id)}
									className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
								>
									Přidat do mých jmen
								</button>
							)}
						</td>
					)}
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