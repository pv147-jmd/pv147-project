"use client";

import { useState, useEffect } from "react";
import { TableCatNames } from "@/components/table-cat-names";
import { addCatName, getAllCatNames, getRandomCatNames, getRandomCatNamesWithoutUsers, searchCatNames } from "@/db/catNames/actions";
import { assignCatNameToUser } from "@/db/usersCatNames/actions";
import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";

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
	
	const { user } = useUser();
	const { data: session } = useSession();

	useEffect(() => {
		const fetchInitialData = async () => {
			const initialCatNames = await getRandomCatNames();
			setCatNames(initialCatNames);
		};
		fetchInitialData();
	}, []);

	const handleRandomNames = async () => {
		const randomNames = await getRandomCatNamesWithoutUsers(user == undefined ? 0 : user?.id);
		const updatedNames = randomNames.map((name) => ({
			...name,
			userId: null,
		}));

		setCatNames(updatedNames);
		setSearchTerm("");
		setShowAllNames(false);
	};

	const handleAllNames = async () => {
		const allNames = await getAllCatNames();
		setCatNames(allNames);
		setSearchTerm("");
		setShowAllNames(true);
	};

	const handleSearch = async (term: string) => {
		const filteredNames = await searchCatNames(term);
		setCatNames(filteredNames);
	};

	const handleSaveNewCatName = async () => {
		if (!newCatName.trim()) return alert("Zadejte platné jméno.");
		await addCatName(newCatName, (user == undefined ? 0 : user?.id));
		setNewCatName("");
		alert("Jméno bylo úspěšně uloženo!");
	};

	const handleAddToMyNames = async () => {
		const nameId = await addCatName(newCatName, 1);
		await assignCatNameToUser((user == undefined ? 0 : user?.id), nameId);
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
							setNewCatName(value);
						}}
						placeholder="Vyhledat jméno"
						className="mr-2 rounded border border-gray-300 px-4 py-2"
					/>
				</div>

				{(user || session?.user) && (searchTerm.trim() && (catNames.length === 0 || !catNames.find((cat) => cat.name.toLowerCase() === searchTerm.trim().toLowerCase()))) && (
					<div className="flex gap-2">
						<button
							onClick={handleSaveNewCatName}
							className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
						>
							Uložit nové jméno
						</button>
						<button
							onClick={() => handleAddToMyNames}
							className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
						>
							Uložit nové a přidat do mých jmen
						</button>
					</div>
				)}
			</div>
		)}

		<div className="mt-10">
			<TableCatNames catNames={catNames} userId={user == undefined ? 0 : user?.id} />
		</div>
	</>
	);
};

export default GeneratePage;
