import { db } from "@/db";

const GeneratePage = async () => {
	const catNames = await db.query.catNames.findMany();
	return (
		<>
			<h1 className="text-3xl">Generování kočičích jmen</h1>

			<div className="mt-10">
			<table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm">
			<thead>
			<tr className="bg-gray-100">
				<th className="border border-gray-300 px-4 py-2 text-left">#</th>
				<th className="border border-gray-300 px-4 py-2 text-left">Jméno</th>
			</tr>
			</thead>
			<tbody>
			{catNames.length > 0 ? (
				catNames.map((catName, index) => (
				<tr key={catName.id} className="hover:bg-gray-50">
					<td className="border border-gray-300 px-4 py-2">{index + 1}</td>
					<td className="border border-gray-300 px-4 py-2">{catName.name}</td>
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
			</div>
		</>
)
};
