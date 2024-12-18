'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { getUsersCatNames } from '@/db/queries/usersCatNamesQueries';
import { useUser } from '@/context/UserContext';
import { type UsersCatNames } from '@/db/schema/usersCatNames';
import { getCatNameById } from '@/db/catNames/actions';

const MyCatNames = () => {
	const { user } = useUser();
	const [ownedCats, setOwnedCats] = useState<
		(UsersCatNames & { catName: string })[]
	>([]);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		const fetchOwnedCats = async (userId: number) => {
			const cats = await getUsersCatNames(userId);
			const catsWithNames = await Promise.all(
				cats.map(async cat => {
					const catName = await getCatNameById(cat.catNameId);
					if (!catName) {
						return { ...cat, catName: 'N/A' };
					}
					return { ...cat, catName: catName.name };
				})
			);
			setOwnedCats(catsWithNames);
			setLoading(false);
		};
		if (user?.id) {
			fetchOwnedCats(user.id);
		}
	}, [user?.id]);

	if (loading) {
		return (
			<>
				<h1 className="text-center text-3xl">Moje kočičky</h1>
				<div className="flex items-center justify-center">
					<div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500 border-opacity-50" />
				</div>
			</>
		);
	}

	return (
		<>
			<h1 className="text-center text-3xl">Moje kočičky</h1>

			<div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				{ownedCats.length > 0 ? (
					ownedCats.map(ownedCat => (
						// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
						<div
							key={ownedCat.id}
							className="cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-md hover:shadow-lg"
							onClick={() => router.push(`/my-names/${ownedCat.id}`)}
						>
							{ownedCat.pictureUrl ? (
								<div className="relative mx-auto h-48 w-48">
									<Suspense fallback={<div>Obrázek bude</div>}>
										<Image
											src={ownedCat.pictureUrl}
											alt="Cat"
											className="object-cover"
											fill
										/>
									</Suspense>
								</div>
							) : (
								<div className="mx-auto flex h-48 w-48 items-center justify-center bg-gray-200">
									No picture
								</div>
							)}
							<div className="mt-4 text-center text-xl font-semibold">
								{ownedCat.catName}
							</div>
						</div>
					))
				) : (
					<div className="col-span-full text-center text-gray-500">
						Nemáte přiřazená žádná jména koček.
					</div>
				)}
			</div>
		</>
	);
};

export default MyCatNames;
