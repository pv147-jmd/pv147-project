import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Providers } from '@/components/providers';
import { UserProvider } from '@/context/UserContext';
import { Navbar } from '@/components/navbar';
import SessionWrapper from '@/components/sessionWrapper';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
	title: 'Generátor kočičích jmen'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body
			className={`flex min-h-screen flex-col bg-gray-200 ${poppins.className}`}
		>
			<SessionWrapper>
				{/*<UserProvider>*/}
				<Navbar />
				<main className="container py-10">
					<Providers>{children}</Providers>
				</main>
				{/*</UserProvider>*/}
			</SessionWrapper>
		</body>
	</html>
);

export default RootLayout;
