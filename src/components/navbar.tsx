import Link from 'next/link';

export const Navbar = () => (
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
		<Link
			href="/my-names"
			className="text-gray-600 hover:text-gray-800 transition"
		>
			Moje jména
		</Link>
		</nav>

		<div className="flex items-center gap-x-4">
		<button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition">
			Přihlásit se
		</button>
		<button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
			Registrovat se
		</button>
		</div>
	</div>
	</header>
);
