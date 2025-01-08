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
	const router = useRouter();

	return (
		<>
			<h1 className="text-center text-3xl">Přidat kočičku</h1>

			<div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
				<input type="file" accept="image/*" capture="environment" />
			</div>
		</>
	);
};

export default MyCatNames;
