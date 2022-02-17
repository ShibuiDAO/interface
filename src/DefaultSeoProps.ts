import type { DefaultSeoProps as DefaultSeoPropsType } from 'next-seo';

export const BaseUrl = 'https://shibuinft.com';
export const DefaultSeoProps: DefaultSeoPropsType = {
	titleTemplate: 'ShibuiNFT | %s',
	title: 'Home',
	canonical: BaseUrl,
	additionalMetaTags: [
		{ name: 'url', content: BaseUrl },
		{ name: 'identifier-URL', content: BaseUrl },
		{ name: 'shortlink', content: BaseUrl },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
		{ name: 'googlebot', content: 'index,follow' },
		// { name: 'author', content: `ShibuiDAO, contact@shibuidao.com` },
		// { name: 'owner', content: `ShibuiDAO, contact@shibuidao.com` },
		// { name: 'designer', content: `ShibuiDAO, contact@shibuidao.com` },
		// { name: 'reply-to', content: 'contact@shibuidao.com' },
		{ name: 'target', content: 'all' },
		{ name: 'audience', content: 'all' },
		{ name: 'coverage', content: 'Worldwide' },
		{ name: 'distribution', content: 'Global' },
		{ name: 'rating', content: 'safe for kids' },
		{ name: 'apple-mobile-web-app-capable', content: 'yes' },
		{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
		{ name: 'HandheldFriendly', content: 'True' },
		{ name: 'apple-mobile-web-app-title', content: 'ShibuiNFT Marketplace' },
		{ name: 'application-name', content: 'ShibuiNFT' },
		{ name: 'revisit-after', content: '7 days' }
		// { property: 'og:email', content: 'contact@shibuidao.com' }
	],
	openGraph: {
		title: 'ShibuiNFT Marketplace',
		url: BaseUrl,
		type: 'website',
		locale: 'en_US',
		site_name: 'ShibuiNFT',
		profile: {
			firstName: 'ShibuiNFT',
			username: 'ShibuiNFT'
		}
	},
	twitter: {
		handle: '@shibuidao',
		site: '@shibuidao',
		cardType: 'summary'
	}
};

export default DefaultSeoProps;
