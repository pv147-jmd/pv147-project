import { CatPictureUpload } from '@/components/my-names/CatPictureUpload';
import { db } from '@/db';
import { Modal } from '@/components/modal';

export const EditMyCat = async ({ catNameId }: { catNameId: number }) => {
	// TODO pass id to the component
	// const params = useParams<{ id: string }>();
	// const [isOpen, setIsOpen] = useState(true);
	const cat = await db.query.usersCatNames.findFirst({
		// where: (usersCatNames, { eq }) => eq(usersCatNames.id, Number(params.slug))
		where: (usersCatNames, { eq }) => eq(usersCatNames.catNameId, catNameId)
	});

	if (!cat) {
		return <div>Cat not found</div>;
	}

	return (
		<Modal
			isOpen
			onClose={() => {
				/* TODO return back */
			}}
		>
			<h1>Edit Cat</h1>
			<div>name: {cat.catNameId}</div>
			<CatPictureUpload />
		</Modal>
	);
};

// export default EditMyCat;
