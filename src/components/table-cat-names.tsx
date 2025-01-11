'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

import {
	assignCatNameToUser,
	getAssignedCatNames
} from '@/db/usersCatNames/actions';

type CatName = {
	id: number;
	name: string;
};

type TableCatNamesProps = {
	catNames: CatName[];
	userId: string;
};

export const TableCatNames: React.FC<TableCatNamesProps> = ({
	catNames,
	userId
}) => {
	const { data: session } = useSession();
	const [assignedCatNames, setAssignedCatNames] = useState<number[]>([]);
	const [loadingCatNames, setLoadingCatNames] = useState<Set<number>>(
		new Set()
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasError, setHasError] = useState(false);
	const rowsPerPage = 50;

	const currentRows = useMemo(() => {
		const startIndex = (currentPage - 1) * rowsPerPage;
		return catNames.slice(startIndex, startIndex + rowsPerPage);
	}, [catNames, currentPage]);

	const totalPages = Math.ceil(catNames.length / rowsPerPage);

	useEffect(() => {
		if (userId) {
			updateAssignedCatNames();
		}
	}, [userId]);

	const updateAssignedCatNames = async () => {
		try {
			setHasError(false);
			const names = await getAssignedCatNames(userId);
			setAssignedCatNames(names);
		} catch (error) {
			console.error('Error fetching assigned cat names:', error);
			setHasError(true);
		}
	};

	const handleAssign = async (catNameId: number) => {
		setLoadingCatNames(prev => new Set(prev).add(catNameId));
		try {
			await assignCatNameToUser(userId, catNameId);
			await updateAssignedCatNames();
		} catch (error) {
			console.error('Chyba při přiřazování jména:', error);
		} finally {
			setLoadingCatNames(prev => {
				const newSet = new Set(prev);
				newSet.delete(catNameId);
				return newSet;
			});
		}
	};

	if (hasError) {
		return (
			<div className="flex h-screen flex-col items-center justify-center text-center">
				<h1 className="text-2xl font-bold text-red-500">Došlo k chybě</h1>
				<p className="mt-2 text-gray-700">
					Při načítání dat došlo k problému. Zkuste to prosím znovu později.
				</p>
			</div>
		);
	}

	return (
		<>
			<table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm">
				<thead>
					<tr className="bg-gray-100">
						<th className="w-8 border border-gray-300 px-4 py-2 text-left sm:w-48">
							#
						</th>
						<th className="border border-gray-300 px-4 py-2 text-left">
							Jméno
						</th>
						{session?.user && (
							<th className="border border-gray-300 px-4 py-2 text-left">
								Akce
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{currentRows.length > 0 ? (
						currentRows.map((catName, index) => (
							<tr key={catName.id} className="hover:bg-gray-50">
								<td className="w-8 border border-gray-300 px-4 py-2 sm:w-48">
									{(currentPage - 1) * rowsPerPage + index + 1}
								</td>
								<td className="border border-gray-300 px-2 py-2">
									{catName.name}
								</td>
								{session?.user && (
									<td className="border border-gray-300 px-2 py-2">
										{assignedCatNames.includes(catName.id) ? (
											<button
												className="cursor-not-allowed rounded bg-green-400 px-4 py-2 text-white"
												disabled
											>
												Přidáno
											</button>
										) : loadingCatNames.has(catName.id) ? (
											<div className="flex justify-center">
												<div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
											</div>
										) : (
											<button
												onClick={() => handleAssign(catName.id)}
												className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
											>
												Přidat
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

			{catNames.length > rowsPerPage && (
				<div className="mt-4 flex items-center justify-between">
					<button
						onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className={`rounded px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
					>
						<span className="sm:hidden">←</span>
						<span className="hidden sm:inline">← Předchozí</span>
					</button>

					<span>
						Stránka {currentPage} z {totalPages}
					</span>

					<button
						onClick={() =>
							setCurrentPage(prev => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
						className={`rounded px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
					>
						<span className="sm:hidden">→</span>
						<span className="hidden sm:inline">Další →</span>
					</button>
				</div>
			)}
		</>
	);
};
