const { withPlausibleProxy } = require('next-plausible');
const { version } = require('./package.json');
const { withSentryConfig } = require('@sentry/nextjs');

const config = {
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
	},
	sentry: {
		widenClientFileUpload: true
	}
};

const sentryWebpackPluginOptions = {
	silent: true
};

const configWithPlausible = withPlausibleProxy()(config);
// @ts-expect-error
const configWithPlausibleAndSentry = withSentryConfig(configWithPlausible, sentryWebpackPluginOptions);
module.exports = configWithPlausibleAndSentry;
