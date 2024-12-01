import { Loader } from 'lucide-react';
import { Suspense } from 'react';

import { GiftList } from '@/modules/gift/components/gift-list';

const Page = async () => (
	<>
		<h1 className="mb-6 text-3xl">Gift list</h1>
		<Suspense fallback={<Loader />}>
			<GiftList />
		</Suspense>
	</>
);

export default Page;
