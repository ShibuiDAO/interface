import { gql } from '@apollo/client';
import { SupportedChainId } from '../constants/chains';
import { Subgraph } from './graphprotocol/subgraphs';

export const generateEIP721ContractQuery = (chainId: SupportedChainId) => gql`
	query GetChainId${chainId}EIP721Assets($owner: String!) {
		erc721Contract(id: $owner) {
			id
			symbol
			name
			tokens(first: 999) {
				id
				uri
				identifier
				contract {
					id
				}
			}
		}
	}
`;

export const generateERC721ExchangeQuery = (chainId: SupportedChainId) => gql`
	query GetChainId${chainId}ContractListings($contract: String!) {
		account(id: $contract) {
			id
			contractSellOrders {
				id
				seller {
					id
				}
				contract {
					id
				}
				token
				expiration
				price
			}
		}
	}
`;

export const ChainSubgraphSets: { [K in SupportedChainId]: [EIP721: Subgraph, ERC721Exchange: Subgraph] } = {
	[SupportedChainId.BOBA]: [Subgraph.BOBA_MAINNET_EIP721, Subgraph.BOBA_RINKEBY_ERC721EXCHANGE],
	[SupportedChainId.BOBA_RINKEBY]: [Subgraph.BOBA_RINKEBY_EIP721, Subgraph.BOBA_RINKEBY_ERC721EXCHANGE]
};
