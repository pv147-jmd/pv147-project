'use client';

const StatsPage = () => {

	return (
		<div className="flex items-center justify-between">
			<h1 className="hidden text-3xl md:flex">Nejpoužívanější jména</h1>
			{isLoading ? (
				<div>Načítání...</div>
			) : (
				<table className="table-auto w-full border border-gray-300">
					<thead>
						<tr>
							<th className="px-4 py-2 border-b">Jméno</th>
							<th className="px-4 py-2 border-b">Počet použití</th>
						</tr>
					</thead>
					<tbody>
						{stats.map((stat, index) => (
							<tr key={index}>
								<td className="px-4 py-2 border-b">{stat.name}</td>
								<td className="px-4 py-2 border-b">{stat.usage_count}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default StatsPage;
