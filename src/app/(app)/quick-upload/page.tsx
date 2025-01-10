'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { QuickUploadImage } from '@/components/quick-upload/QuickUploadImage';
import { QuickUploadNamesSelect } from '@/components/quick-upload/quickUploadNamesSelect';
import {
	useAssignCatMutation,
	useRandomCatNames
} from '@/db/queries/catNamesQueries';

const MyCatNames = () => {
	const { data: session } = useSession();
	const { mutate, isPending } = useAssignCatMutation();
	const userId = session?.user?.id ? session.user.id : '-1';
	const {
		data: randomCatNames,
		isLoading: isLoadingRandomNames,
		refetch
	} = useRandomCatNames(userId, 4);
	const router = useRouter();

	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [selectedName, setSelectedName] = useState<number>(-1);

	const onSubmit = () => {
		mutate(
			{
				userId,
				catNameId: selectedName,
				pictureUrl: imageUrl ?? ''
			},
			{
				onSuccess: () => {
					console.log('successfully uploaded cat');
					router.replace('/my-names');
				}
			}
		);
	};

	return (
		<div className="container h-screen w-fit bg-white p-4 lg:w-1/2">
			<h1 className="text-center text-3xl">Přidat kočičku</h1>

			<div>
				<QuickUploadImage setUrl={setImageUrl} />
				{isLoadingRandomNames && (
					<div className="m-10 flex items-center justify-center">
						<div className="h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-blue-500 border-opacity-50" />
					</div>
				)}
				<QuickUploadNamesSelect
					selectedOption={selectedName}
					setSelectedOption={setSelectedName}
					options={randomCatNames ?? []}
				/>
			</div>
			<div className="mt-4 flex items-center justify-center space-x-10">
				<button
					className="rounded-xl bg-cyan-300 p-4 text-xl"
					disabled={isPending}
					onClick={() => refetch()}
				>
					Jiná jména
				</button>
				<button
					className="ml-10 rounded-xl bg-green-400 p-4 text-xl"
					disabled={isPending}
					onClick={() => onSubmit()}
				>
					{isPending ? 'Přidávám...' : 'Vytvořit'}
				</button>
			</div>
		</div>
	);
};

export default MyCatNames;
