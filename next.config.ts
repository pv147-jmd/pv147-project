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
	}
};

export default nextConfig;
