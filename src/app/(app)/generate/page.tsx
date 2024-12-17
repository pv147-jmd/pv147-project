"use client";

import { useState, useEffect } from "react";
import { TableCatNames } from "@/components/table-cat-names";
import { addCatName, getAllCatNames, getRandomCatNames, searchCatNames } from "@/db/catNames/actions";
import { assignCatNameToUser } from "@/db/usersCatNames/actions";

type CatName = {
	id: number;
	name: string;
	userId: number | null;
};

const GeneratePage = () => {
	const [catNames, setCatNames] = useState<CatName[]>([]);
	const [showAllNames, setShowAllNames] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [newCatName, setNewCatName] = useState("");

	useEffect(() => {
		const fetchInitialData = async () => {
			const initialCatNames = await getAllCatNames();
			setCatNames(initialCatNames);
		};
		fetchInitialData();
	}, []);

	const handleRandomNames = async () => {
		const randomNames = await getRandomCatNames();
		setCatNames(randomNames);
		setShowAllNames(false);
	};

	const handleAllNames = async () => {
		const allNames = await getAllCatNames();
		setCatNames(allNames);
		setShowAllNames(true);
	};

	const handleSearch = async (term: string) => {
		const filteredNames = await searchCatNames(term);
		setCatNames(filteredNames);
	};

	const handleSaveNewCatName = async () => {
		if (!newCatName.trim()) return alert("Zadejte platné jméno.");
		await addCatName(newCatName, 1); // TODO opravit a brat id usera z kontextu
		setNewCatName("");
		alert("Jméno bylo úspěšně uloženo!");
	};

	const handleAddToMyNames = async () => {
		const nameId = await addCatName(newCatName, 1);
		await assignCatNameToUser(1, nameId); // TODO opravit a brat id usera z kontextu
		alert("Jméno bylo uloženo a přidáno do vašich jmen!");
	};

	return (
	<>
		<div className="flex justify-between items-center mt-6">
			<h1 className="text-3xl">Generování kočičích jmen</h1>
			<div>
				<button
				onClick={handleRandomNames}
				className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				>
				10 náhodných jmen
				</button>
				<button
				onClick={handleAllNames}
				className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
				>
				Všechna jména
				</button>
			</div>
		</div>

		{showAllNames && (
			<div className="flex flex-col justify-center items-center mt-8">
				<div className="flex items-center mb-4">
					<label className="mr-4">Vyhledat:</label>
					<input
						type="text"
						value={searchTerm}
						onChange={async (e) => {
							const value = e.target.value;
							setSearchTerm(value);
							await handleSearch(value);
							setNewCatName(value); // Nastavit pro možnost uložení nového jména
						}}
						placeholder="Vyhledat jméno"
						className="mr-2 rounded border border-gray-300 px-4 py-2"
					/>
				</div>

				{catNames.length === 0 && searchTerm.trim() && (
					<div className="flex gap-2">
						<button
							onClick={handleSaveNewCatName}
							className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
						>
							Uložit nové jméno
						</button>
						<button
							onClick={() => handleAddToMyNames} // Simuluje přidání do mých jmen
							className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
						>
							Uložit nové a přidat do mých jmen
						</button>
					</div>
				)}
			</div>
		)}

		<div className="mt-10">
			<TableCatNames catNames={catNames} userId={1} />
		</div>
	</>
	);							//TODO TADY OPRAVIT PRIRAZENI USERID Z KONTEXTU
};

export default GeneratePage;
