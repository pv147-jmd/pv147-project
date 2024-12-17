'use client';
import Link from 'next/link';
import { useUser } from "@/context/UserContext";
import { useRouter } from 'next/navigation';

export const Navbar = () => {
	const { user, logout } = useUser();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/"); 
	  };

	return (
	<header className="bg-white shadow">
	<div className="container mx-auto flex items-center justify-between py-4 px-6">
		<Link href="/" className="text-xl font-bold text-gray-800">
		🐾 Generátor kočičích jmen
		</Link>

		<nav className="flex items-center gap-x-6">
		<Link
			href="/generate"
			className="text-gray-600 hover:text-gray-800 transition"
		>
			Generování jmen
		</Link>
		{ user && 
		<Link
			href="/my-names"
			className="text-gray-600 hover:text-gray-800 transition"
		>
			Moje jména
		</Link>}
		</nav>

		{ !user && 
		<div className="flex items-center gap-x-4">
		<nav className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition">
			<Link
				href="/login"
			>
				Přihlásit se
			</Link>
		</nav>
		<nav className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
			<Link
				href="/register"
			>
				Registrovat se
			</Link>
		</nav>
		</div>}

		{user && (
			<div className="flex items-center gap-x-4">
				<p className="text-sm text-gray-800 font-medium">
				Přihlášen jako: <span className="font-semibold">{user.email}</span>
				</p>
				<button
				onClick={handleLogout}
				className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-200"
				>
				Odhlásit se
				</button>
			</div>
		)}
	</div>
	</header>
	);
};
