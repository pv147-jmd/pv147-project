'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { TableCatNames } from '@/components/table-cat-names';
import { addCatName, searchCatNames } from '@/db/catNames/actions';
import {
	useAllCatNames,
	CatName,
	useTenRandomCatNames
} from '@/db/queries/catNamesQueries';
import { useUser } from '@/context/UserContext';
const GeneratePage = () => {
	const [showAllNames, setShowAllNames] = useState(false);

	// const { user } = useUser();
	const { data: session } = useSession();

	const { data: allCatNames, isLoading: isLoadingAllNames } = useAllCatNames();
	const {
		data: randomCatNames,
		isLoading: isLoadingRandomNames,
		refetch
	} = useTenRandomCatNames(user?.id ?? -1);

	const dataCatNames: CatName[] = showAllNames
		? (allCatNames ?? [])
		: (randomCatNames ?? []);

	const isLoading = showAllNames ? isLoadingAllNames : isLoadingRandomNames;

	const handleRandomNames = () => {
		setSearchTerm('');
		setShowAllNames(false);
		refetch();
	};

	const handleAllNames = () => {
		setSearchTerm('');
		setShowAllNames(true);
	};

	const [searchTerm, setSearchTerm] = useState('');
	const [newCatName, setNewCatName] = useState('');

	const handleSearch = async (term: string) => {
		//setIsLoading(true);
		const filteredNames = await searchCatNames(term);
		//setCatNames(filteredNames);
		//setIsLoading(false);
	};

	const handleSaveNewCatName = async () => {
		if (!newCatName.trim()) return alert('Zadejte platné jméno.');
		await addCatName(newCatName, session?.user?.id ?? "0");
		handleSearch(newCatName);
		setNewCatName('');
	};

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="hidden text-3xl md:flex">Generování kočičích jmen</h1>
				<div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
					<button
						onClick={handleRandomNames}
						className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
					>
						10 náhodných jmen
					</button>
					<button
						onClick={handleAllNames}
						className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
					>
						Všechna jména
					</button>
				</div>
			</div>

			{showAllNames && (
				<div className="mt-2 flex flex-col items-center justify-center">
					<div className="mb-2 flex items-center">
						<label htmlFor="searchInput" className="mr-4">
							Vyhledat:
						</label>
						<input
							type="text"
							value={searchTerm}
							onChange={async e => {
								const value = e.target.value;
								setSearchTerm(value);
								await handleSearch(value);
								setNewCatName(value);
							}}
							placeholder="Vyhledat jméno"
							className="mr-2 w-40 rounded border border-gray-300 px-4 py-2 sm:w-auto"
						/>
					</div>

					{(session?.user) &&
						searchTerm.trim() &&
						/*(catNames.length === 0 ||
							!catNames.find(
								cat =>
									cat.name.toLowerCase() === searchTerm.trim().toLowerCase()
							)) &&
							*/
						!isLoading && (
							<div className="flex gap-2">
								<button
									onClick={handleSaveNewCatName}
									className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
								>
									Uložit nové jméno
								</button>
							</div>
						)}
				</div>
			)}

			<div className="mt-2">
				{isLoading ? (
					<div className="flex items-center justify-center">
						<div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500 border-opacity-50" />
					</div>
				) : (
					<TableCatNames catNames={dataCatNames} userId={user?.id ?? 0} />
				)}
			</div>
		</>
	);
};

export default GeneratePage;
