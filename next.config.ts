import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		turbo: false, // Disable Turbopack and revert to Webpack
	  },
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
