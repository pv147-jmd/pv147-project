'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { TableCatNames } from '@/components/table-cat-names';
import {
	addCatName,
	getAllCatNames,
	getRandomCatNames,
	getRandomCatNamesWithoutUsers,
	searchCatNames
} from '@/db/catNames/actions';


type CatName = {
	id: number;
	name: string;
	userId: number | null;
};

const GeneratePage = () => {
	const [catNames, setCatNames] = useState<CatName[]>([]);
	const [showAllNames, setShowAllNames] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [newCatName, setNewCatName] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const { data: session } = useSession();

	useEffect(() => {
		const fetchInitialData = async () => {
			const initialCatNames = await getRandomCatNames();
			setCatNames(initialCatNames);
			setIsLoading(false);
		};
		fetchInitialData();
	}, []);

	const handleRandomNames = async () => {
		setIsLoading(true);
		const randomNames = await getRandomCatNamesWithoutUsers(session.user?.id ?? 0);
		const updatedNames = randomNames.map(name => ({
			...name,
			userId: null
		}));

		setCatNames(updatedNames);
		setSearchTerm('');
		setShowAllNames(false);
		setIsLoading(false);
	};

	const handleAllNames = async () => {
		setIsLoading(true);
		const allNames = await getAllCatNames();
		setCatNames(allNames);
		setSearchTerm('');
		setShowAllNames(true);
		setIsLoading(false);
	};

	const handleSearch = async (term: string) => {
		setIsLoading(true);
		const filteredNames = await searchCatNames(term);
		setCatNames(filteredNames);
		setIsLoading(false);
	};

	const handleSaveNewCatName = async () => {
		if (!newCatName.trim()) return alert('Zadejte platné jméno.');
		await addCatName(newCatName, session.user?.id ?? 0);
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
						(catNames.length === 0 ||
							!catNames.find(
								cat =>
									cat.name.toLowerCase() === searchTerm.trim().toLowerCase()
							)) &&
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
					<TableCatNames catNames={catNames} userId={session.user?.id ?? 0} />
				)}
			</div>
		</>
	);
};

export default GeneratePage;
