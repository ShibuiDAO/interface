import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { client } from 'client';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import PinnedComponents from 'components/PinnedComponents';
import DefaultSeoProps from 'DefaultSeoProps';
import type { NextPage } from 'next';
import PlausibleProvider from 'next-plausible';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'state';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { chains, wagmiClient } from 'core/wallet';

import 'styles/_App.css';
import '@rainbow-me/rainbowkit/styles.css';

config.autoAddCss = false;

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<React.StrictMode>
			<WagmiProvider client={wagmiClient}>
				<RainbowKitProvider
					chains={chains}
					showRecentTransactions={true}
					coolMode={true}
					theme={darkTheme({ accentColor: '#FDA360', accentColorForeground: '#000' })}
				>
					<PlausibleProvider domain="shibuinft.com">
						<ApolloProvider client={client}>
							<Provider store={store}>
								<Head>
									<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
									<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
									<meta httpEquiv="Expires" content="1y" />
									<meta httpEquiv="Pragma" content="1y" />
									<meta httpEquiv="Cache-Control" content="1y" />

									<meta httpEquiv="Page-Enter" content="RevealTrans(Duration=2.0,Transition=2)" />
									<meta httpEquiv="Page-Exit" content="RevealTrans(Duration=3.0,Transition=12)" />

									<link rel="manifest" href="/manifest.json" />

									<link rel="shortcut icon" href="/favicon.ico" />
								</Head>
								<DefaultSeo {...DefaultSeoProps} />

								<>
									<PinnedComponents>
										<div className="min-h-screen">
											<Navbar />

											<main className="min-h-screen dark:bg-darks-400 dark:text-white">
												<Component {...pageProps} />
											</main>

											<footer>
												<Footer />
											</footer>
										</div>
									</PinnedComponents>
								</>
							</Provider>
						</ApolloProvider>
					</PlausibleProvider>
				</RainbowKitProvider>
			</WagmiProvider>
		</React.StrictMode>
	);
};

export default App;
