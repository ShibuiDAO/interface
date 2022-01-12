import { gql } from '@apollo/client';
import type { SupportedChainId } from './chains';

export const generateEIP721Query = (chainId: SupportedChainId) => gql`
	query GetChainId${chainId}EIP721Assets($owner: String!) {
		account(id: $owner) {
			id
			ERC721tokens(first: 999) {
				id
				uri
				identifier
				contract {
					id
					name
					symbol
				}
			}
		}
	}
`;
