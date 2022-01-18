import { ApolloProvider } from '@apollo/client';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
import { Web3ReactProvider } from '@web3-react/core';
import { client } from 'client';
import OrderDisplay from 'components/Assets/Order/OrderDisplay';
import Navbar from 'components/Navbar/Navbar';
import type { NextPage } from 'next';
import PlausibleProvider from 'next-plausible';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'state';
import 'styles/_App.css';

config.autoAddCss = false;

const Connect = dynamic(() => import('components/Connect/Connect'), { ssr: false });

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
	return new Web3Provider(provider);
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<React.StrictMode>
				<PlausibleProvider domain="shibuinft.com">
					<ApolloProvider client={client}>
						<Provider store={store}>
							<Web3ReactProvider getLibrary={getLibrary}>
								<Head>
									{/* This fixes big icons with next-seo since CSS is somehow overwritten*/}
									<style>{dom.css()}</style>
								</Head>

								<>
									<Connect />
									<OrderDisplay />

									<header>
										<Navbar />
									</header>

									<main className="dark:bg-gray-900 dark:text-white min-h-screen">
										<Component {...pageProps} />
									</main>
								</>
							</Web3ReactProvider>
						</Provider>
					</ApolloProvider>
				</PlausibleProvider>
			</React.StrictMode>
		</>
	);
};

export default App;
