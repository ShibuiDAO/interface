import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { Query as PlyEIP721Query } from '@subgraphs/eip721-matic';
import { baseLink } from './links';

export const client = new ApolloClient({
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

export type EIP721Response<K extends keyof Omit<PlyEIP721Query, '__typename'>> = Record<K, Omit<PlyEIP721Query[K], '__typename'>>;
