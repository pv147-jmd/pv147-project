'use server';
import { EditMyCat } from '@/app/(app)/my-names/[slug]/EditMyCat';
import { getUsersCatNameById } from '@/db/queries/usersCatNamesQueries';
import { getCatNameById } from '@/db/catNames/actions';

const Page = async ({
	params
}: {
	params: Promise<{
		slug: string;
	}>;
}) => {
	const id = await params;
	const userCatName = await getUsersCatNameById(Number(id.slug));
	if (!userCatName) {
		return <div>Not found</div>;
	}
	const catName = await getCatNameById(userCatName.catNameId);
	if (!catName) {
		return <div>Name not found</div>;
	}
	return (
		<EditMyCat
			userCatName={{
				id: userCatName.id,
				userId: userCatName.userId,
				pictureUrl: userCatName.pictureUrl ? userCatName.pictureUrl : ''
			}}
			name={catName.name}
		/>
	);
};
export default Page;
