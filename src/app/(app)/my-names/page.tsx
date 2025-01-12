'use server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getUsersCatNames } from '@/db/queries/usersCatNamesQueries';
import { auth } from '@/auth';
import { CatCart } from '@/components/my-names/catCart';

const MyCatNames = async () => {
	const session = await auth();
	if (!session?.user) {
		redirect('/login');
	}
	const ownedCats = await getUsersCatNames(session?.user.id);
	console.log(ownedCats);
	return (
		<>
			<h1 className="text-center text-3xl">Moje kočičky</h1>

			<Suspense
				fallback={
					<div className="flex items-center justify-center">
						<div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500 border-opacity-50" />
					</div>
				}
			>
				<div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
					{ownedCats.length > 0 ? (
						ownedCats.map(ownedCat => (
							<CatCart
								key={ownedCat.id}
								userCatId={ownedCat.id}
								catName={ownedCat.catName.name}
								pictureUrl={ownedCat.pictureUrl}
							/>
						))
					) : (
						<div className="col-span-full text-center text-gray-500">
							Nemáte přiřazená žádná jména koček.
						</div>
					)}
				</div>
			</Suspense>
		</>
	);
};

export default MyCatNames;
