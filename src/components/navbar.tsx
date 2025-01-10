'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';


export const Navbar = () => {

	const router = useRouter();
	const { data: session, status } = useSession();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


	console.log('user', session?.user);
	console.log('user id', session?.user.id);

	const handleLogout = async () => {
		if (session?.user) {
			await signOut({ redirect: true });
		} 
		router.push('/');
	};

	return (
		<header className="bg-white shadow">
			<div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
				<Link
					href="/"
					className="flex items-center text-xl font-bold text-gray-800"
				>
					<img src="/favicon.ico" alt="Icon" className="mr-2 h-10 w-10" />
					Generátor kočičích jmen
				</Link>

				{/* Desktop menu */}
				<nav className="hidden items-center gap-x-6 lg:flex">
					<Link
						href="/generate"
						className="text-gray-600 transition hover:text-gray-800"
					>
						Generování jmen
					</Link>
					{(session?.user) && (
						<Link
							href="/my-names"
							className="text-gray-600 transition hover:text-gray-800"
						>
							Moje jména
						</Link>
					)}
				</nav>

				{/* Mobile menu button */}
				<button
					className="block text-gray-600 focus:outline-none lg:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					<svg
						className="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				{/* User actions */}
				<div className="hidden items-center gap-x-4 lg:flex">
					{!session?.user && (
						<>
							<Link
								href="/login"
								className="rounded bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
							>
								Přihlásit se
							</Link>
							<Link
								href="/register"
								className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
							>
								Registrovat se
							</Link>
						</>
					)}
					{session?.user && (
						<>
							<p className="text-sm font-medium text-gray-800">
								Přihlášen:
								{session?.user && <span className="font-semibold">{session?.user.email}</span>}
							</p>
							<button
								onClick={handleLogout}
								className="rounded bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
							>
								Odhlásit se
							</button>
						</>
					)}
				</div>
			</div>

			{/* Mobile menu dropdown */}
			{isMobileMenuOpen && (
				<div className="bg-white shadow-md lg:hidden">
					<nav className="flex flex-col gap-y-4 px-6 py-4">
						<Link
							href="/generate"
							className="text-gray-600 transition hover:text-gray-800"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Generování jmen
						</Link>
						{session?.user && (
							<Link
								href="/my-names"
								className="text-gray-600 transition hover:text-gray-800"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Moje jména
							</Link>
						)}
						{!session?.user && (
							<>
								<Link
									href="/login"
									className="rounded bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Přihlásit se
								</Link>
								<Link
									href="/register"
									className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Registrovat se
								</Link>
							</>
						)}
					</nav>
					{session?.user && (
						<div className="border-t border-gray-200 px-6 py-4">
							<button
								onClick={handleLogout}
								className="w-full rounded bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
							>
								{session?.user && <span>{session?.user.email}</span>} - Odhlásit se
							</button>
						</div>
					)}
				</div>
			)}
		</header>
	);
};
