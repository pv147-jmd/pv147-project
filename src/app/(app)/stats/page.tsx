'use client';

import { useGetUsedCatNamesWithCount } from "@/db/queries/usersCatNamesQueries";

const StatsPage = () => {

	const { data, isLoading } = useGetUsedCatNamesWithCount();

	const maxUsageCount = Math.max(...(data?.map((stat) => stat.usageCount) || [0]));

	return (
		<div className="flex flex-col items-center justify-between">
			<h1 className="text-3xl mb-4 md:block hidden">Nejpoužívanější jména</h1>
			{isLoading ? (
				<div>Načítání...</div>
			) : (
				<table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm">
					<thead>
						<tr className="bg-gray-100">
							<th className="w-8 border border-gray-300 px-4 py-2 text-left sm:w-48">
								#
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Jméno
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Počet použití
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left"></th>
						</tr>
					</thead>
					<tbody>
						{data?.map((stat, index) => (
							<tr key={index}>
								<td className="w-8 border border-gray-300 px-4 py-2 sm:w-48">
									{index + 1}
								</td>
								<td className="w-8 border border-gray-300 px-4 py-2 sm:w-48">{stat.name}</td>
								<td className="w-8 border border-gray-300 px-4 py-2 sm:w-48">{stat.usageCount}</td>
								<td className="w-8 border border-gray-300 px-4 py-2 sm:w-48">
									<div
										className="h-2 bg-blue-500 rounded"
										style={{
											width: `${(stat.usageCount / maxUsageCount) * 100}%`
										}}
									></div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default StatsPage;
