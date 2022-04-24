const { withPlausibleProxy } = require('next-plausible');
const { version } = require('./package.json');

module.exports = withPlausibleProxy()({
	publicRuntimeConfig: {
		version: version || '0.0.0'
	},
	async rewrites() {
		return [
			{
				source: '/index',
				destination: '/'
			},
			{
				source: '/app',
				destination: '/app/collections'
			},
			{
				source: '/app/collections/index',
				destination: '/app/collections'
			}
		];
	},
	async redirects() {
		return [
			{
				source: '/app/collection',
				destination: '/app/collections',
				permanent: true
			}
		];
	}
});
