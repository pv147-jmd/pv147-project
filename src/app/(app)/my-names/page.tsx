'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { db } from '@/db';
import { EditMyCat } from '@/app/(app)/my-names/[slug]/EditMyCat';
import { getUsersCatNames } from '@/db/queries/usersCatNamesQueries';
import { useUser } from '@/context/UserContext';
import { type UsersCatNames } from '@/db/schema/usersCatNames';

const MyCatNames = () => {
	const { user } = useUser();
	const [ownedCats, setOwnedCats] = useState<UsersCatNames[]>([]);
	const { data: session } = useSession();

	const currentUser = user ? user : session?.user ? session.user : null;
	if (!currentUser) {
		redirect('/login');
	}

	useEffect(() => {
		const fetchOwnedCats = async (userId: number) => {
			const ownedCats = await getUsersCatNames(userId);
			setOwnedCats(ownedCats);
		};
		fetchOwnedCats(Number(currentUser.id));
	}, [currentUser.id]);

	return (
		<>
			<h1 className="text-3xl">Moje kočičky</h1>

			<div className="mt-10">
				<table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-300 px-4 py-2 text-left">#</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Jméno
							</th>
						</tr>
					</thead>
					<tbody>
						{ownedCats.length > 0 ? (
							ownedCats.map((ownedCat, index) => (
								<tr key={ownedCat.id} className="hover:bg-gray-50">
									<td className="border border-gray-300 px-4 py-2">
										{index + 1}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										jméno kočky
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{ownedCat.pictureUrl ? (
											<Image
												src={ownedCat.pictureUrl}
												alt="Cat"
												className="h-16 w-16 object-cover"
												width={64}
												height={64}
											/>
										) : (
											'No picture'
										)}
										<Link href={`/my-names/${ownedCat.id}`}>Edit</Link>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={3}
									className="border border-gray-300 px-4 py-2 text-center text-gray-500"
								>
									Nemáte přiřazená žádná jména koček.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default MyCatNames;
