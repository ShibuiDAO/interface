import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { Query as EIP721Query } from '@subgraphs/eip721-matic';
import type { Query as ERC721ExchangeQuery } from '@tapioca-market/erc721exchange-types';
import { baseLink } from './links';

export const client = new ApolloClient({
	ssrMode: typeof window === 'undefined',
	link: baseLink,
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache'
		},
		query: {
			fetchPolicy: 'no-cache'
		}
	}
});

export type EIP721Response<K extends keyof Omit<EIP721Query, '__typename'>> = Record<K, Omit<EIP721Query[K], '__typename'>>;
export type ERC721ExchangeResponse<K extends keyof Omit<ERC721ExchangeQuery, '__typename'>> = Record<K, Omit<ERC721ExchangeQuery[K], '__typename'>>;
