import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getUser } from '@/auth/session-user';
import { signOut } from '@/auth/auth';

export const Navbar = async () => {
	const user = await getUser();

	// const router = useRouter();
	// const { data: session } = useSession();

	const handleLogout = async () => {
		await signOut({ redirect: true });
		redirect('/');
	};

	return (
		<header className="bg-white shadow">
			<div className="container mx-auto flex items-center justify-between px-6 py-4">
				<Link
					href="/"
					className="flex items-center text-xl font-bold text-gray-800"
				>
					<img src="/favicon.ico" alt="Icon" className="mr-2 h-10 w-10" />
					Generátor kočičích jmen
				</Link>

				<nav className="flex items-center gap-x-6">
					<Link
						href="/generate"
						className="text-gray-600 transition hover:text-gray-800"
					>
						Generování jmen
					</Link>
					{user && (
						<Link
							href="/my-names"
							className="text-gray-600 transition hover:text-gray-800"
						>
							Moje jména
						</Link>
					)}
				</nav>

				{!user && (
					<div className="flex items-center gap-x-4">
						<nav className="rounded bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200">
							<Link href="/login">Přihlásit se</Link>
						</nav>
						<nav className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
							<Link href="/register">Registrovat se</Link>
						</nav>
					</div>
				)}

				{user && (
					<div className="flex items-center gap-x-4">
						<p className="text-sm font-medium text-gray-800">
							Přihlášen jako:{' '}
							<span className="font-semibold">
								{user.name ? user.name : user.email}
							</span>
						</p>
						<button
							onClick={handleLogout}
							className="rounded bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
						>
							Odhlásit se
						</button>
					</div>
				)}
			</div>
		</header>
	);
};
