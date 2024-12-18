'use server';
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
import GoogleLoginButton from '@/components/GoogleLoginButton';

// import { auth, signIn } from '@/auth/auth';

const Login = async () => (
	<div className="flex min-h-min flex-col items-center justify-center">
		<h1 className="mb-4 text-2xl font-bold">Přihlášení</h1>
		<br />
		<div className="mt-2 max-w-sm px-6 sm:px-0">
			<GoogleLoginButton />
		</div>
	</div>
);
// const [formData, setFormData] = useState({ email: '', password: '' });
// const [error, setError] = useState('');
// const [success, setSuccess] = useState(false);
// const searchParams = useSearchParams();
// const router = useRouter();
//
// const handleGoogleLogin = async () => {
// 	await signIn('google', { redirectTo: '/' });
// };

// useEffect(() => {
// 	if (searchParams.get('registered') === 'true') {
// 		setSuccess(true);
// 	}
// }, [searchParams]);
//
// const handleSubmit = async (e: React.FormEvent) => {
// 	e.preventDefault();
// 	setError('');
//
// 	if (!formData.email || !formData.password) {
// 		setError('E-mail a heslo jsou povinné.');
// 		return;
// 	}
// 	await signIn('credentials', {
// 		email: formData.email,
// 		password: formData.password,
// 		redirectTo: '/'
// 	});
// const { ...payload } = formData;
//
// try {
// 	const response = await fetch('/api/auth/login', {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(payload)
// 	});
//
// 	const data = await response.json();
//
// 	if (response.ok) {
// 		setUser(data.user);
//
// 		localStorage.setItem('user', JSON.stringify(data.user));
// 		router.push('/');
// 	} else {
// 		const { message } = data;
// 		setError(message || 'Neplatný e-mail nebo heslo.');
// 	}
// } catch (error: any) {
// 	console.error('Fetch error:', error.message || error);
// 	setError(
// 		error.message ||
// 			'Při přihlašování došlo k chybě. Zkuste to prosím znovu.'
// 	);
// }
// };

// return (
// 	<div className="flex min-h-min flex-col items-center justify-center">
// 		{/*{success && (*/}
// 		{/*	<p className="mb-4 text-green-500">*/}
// 		{/*		Registrace proběhla úspěšně! Nyní se múžete přihlásit.*/}
// 		{/*	</p>*/}
// 		{/*)}*/}
// 		<h1 className="mb-4 text-2xl font-bold">Přihlášení</h1>
// 		{/*<form className="flex w-80 flex-col" onSubmit={handleSubmit}>*/}
// 		{/*	<input*/}
// 		{/*		className="mb-2 rounded border p-2"*/}
// 		{/*		type="email"*/}
// 		{/*		placeholder="Email"*/}
// 		{/*		value={formData.email}*/}
// 		{/*		onChange={e => setFormData({ ...formData, email: e.target.value })}*/}
// 		{/*	/>*/}
// 		{/*	<input*/}
// 		{/*		className="mb-4 rounded border p-2"*/}
// 		{/*		type="password"*/}
// 		{/*		placeholder="Heslo"*/}
// 		{/*		value={formData.password}*/}
// 		{/*		onChange={e => setFormData({ ...formData, password: e.target.value })}*/}
// 		{/*	/>*/}
// 		{/*	{error && <p className="mb-2 text-red-500">{error}</p>}*/}
// 		{/*	<button className="rounded bg-blue-500 p-2 text-white" type="submit">*/}
// 		{/*		Přihlásit*/}
// 		{/*	</button>*/}
// 		<br />
// 		<div className="mt-2 max-w-sm px-6 sm:px-0">
// 			<button
// 				type="button"
// 				onClick={handleGoogleLogin}
// 				className="mb-2 mr-2 inline-flex w-full items-center justify-between rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
// 			>
// 				<svg
// 					className="-ml-1 mr-2 h-4 w-4"
// 					aria-hidden="true"
// 					focusable="false"
// 					data-prefix="fab"
// 					data-icon="google"
// 					role="img"
// 					xmlns="http://www.w3.org/2000/svg"
// 					viewBox="0 0 488 512"
// 				>
// 					<path
// 						fill="currentColor"
// 						d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
// 					/>
// 				</svg>
// 				Přihlásit se přes Google
// 				<div />
// 			</button>
// 		</div>
// 		{/*</form>*/}
// 	</div>
// );
export default Login;
