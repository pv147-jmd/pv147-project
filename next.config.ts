import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: true,
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'btjfnr7ztra7gbil.public.blob.vercel-storage.com',
				port: '',
				pathname: '**',
				search: ''
			}
		]
	},
	env: {
		TURSO_DB_DATABASE_URL: process.env.TURSO_DB_DATABASE_URL,
		TURSO_DB_AUTH_TOKEN: process.env.TURSO_DB_AUTH_TOKEN,
	},
};

export default nextConfig;
