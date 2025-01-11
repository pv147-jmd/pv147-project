'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

// import { useUser } from '@/context/UserContext';

// Heslo na test: TestPassword123

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	// const { setUser } = useUser();

	const handleGoogleLogin = async () => {
		await signIn('google', { redirectTo: '/' });
	};

	useEffect(() => {
		if (searchParams.get('registered') === 'true') {
			setSuccess(true);
		}
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!formData.email || !formData.password) {
			setError('E-mail a heslo jsou povinné.');
			return;
		}

		// const { ...payload } = formData;

		try {
			const result = await signIn('credentials', {
				redirect: false,
				email: formData.email,
				password: formData.password
			});

			if (result?.error) {
				setError(result.error);
			} else {
				router.replace('/');
			}
		} catch (error: any) {
			console.error('Fetch error:', error.message || error);
			setError(
				error.message ||
					'Při přihlašování došlo k chybě. Zkuste to prosím znovu.'
			);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
				{success && (
					<p className="mb-4 text-center text-green-500">
						Registrace proběhla úspěšně! Nyní se můžete přihlásit.
					</p>
				)}
				<h1 className="mb-4 text-center text-2xl font-bold">Přihlášení</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<input
						className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="email"
						placeholder="Email"
						value={formData.email}
						onChange={e => setFormData({ ...formData, email: e.target.value })}
					/>
					<input
						className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="password"
						placeholder="Heslo"
						value={formData.password}
						onChange={e =>
							setFormData({ ...formData, password: e.target.value })
						}
					/>
					{error && <p className="text-center text-sm text-red-500">{error}</p>}
					<button
						className="w-full rounded-md bg-blue-500 py-3 text-white transition duration-200 hover:bg-blue-600"
						type="submit"
					>
						Přihlásit
					</button>
				</form>
				<div className="mt-4">
					<button
						type="button"
						onClick={handleGoogleLogin}
						className="flex w-full items-center justify-center space-x-2 rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
					>
						<svg
							className="-ml-1 mr-2 h-4 w-4"
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="google"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 488 512"
						>
							<path
								fill="currentColor"
								d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
							/>
						</svg>
						Přihlásit se přes Google
					</button>
				</div>
			</div>
		</div>
	);
};

const Page = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Login />
	</Suspense>
);

export default Page;
