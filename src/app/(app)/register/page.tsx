'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		nickname: '',
		confirmPassword: ''
	});
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		// Check for empty fields
		if (!formData.email || !formData.password || !formData.nickname) {
			setError('Všechna pole jsou povinná.');
			return;
		}

		// Password comparison
		if (formData.password !== formData.confirmPassword) {
			setError('Hesla se neshodují.');
			return;
		}

		// Remove confirmPassword from payload
		const { confirmPassword, ...payload } = formData;

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			const data = await response.json();
			// router.push('/login?registered=true');

			// Sign user in with credentials after register
			const signInResponse = await signIn('credentials', {
				redirect: false,
				email: formData.email,
				password: formData.password
			});

			if (signInResponse?.error) {
				setError(signInResponse.error);
			} else {
				// Redirect to home page or dashboard
				router.replace('/');
			}
		} catch (error: any) {
			console.error('Fetch error:', error.message || error);
			setError('Něco se pokazilo. Zkuste to prosím znovu.');
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
				<h1 className="mb-4 text-center text-2xl font-bold">Registrace</h1>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<input
						className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						placeholder="Uživatelské jméno"
						value={formData.nickname}
						onChange={e =>
							setFormData({ ...formData, nickname: e.target.value })
						}
					/>
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
					<input
						className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="password"
						placeholder="Potvrďte heslo"
						value={formData.confirmPassword}
						onChange={e =>
							setFormData({ ...formData, confirmPassword: e.target.value })
						}
					/>
					{error && <p className="text-sm text-red-500">{error}</p>}
					<button
						className="w-full rounded-md bg-blue-500 py-3 text-white transition duration-200 hover:bg-blue-600"
						type="submit"
					>
						Registrovat
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
