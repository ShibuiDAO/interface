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
