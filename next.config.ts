import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		turbo: false, // Disable Turbopack and revert to Webpack
	  },
	productionBrowserSourceMaps: true
};

export default nextConfig;
