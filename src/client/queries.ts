import { gql } from '@apollo/client';
import { SupportedChainId } from '../constants/chains';
import { Subgraph } from './graphprotocol/subgraphs';

export const generateEIP721ContractQuery = (
	chainId: SupportedChainId,
	paging_by = 999,
	paging_from = 0,
	paging_to: number = paging_from + paging_by
) => gql`
	query GetChainId${chainId}EIP721Assets($owner: String!) {
		erc721Contract(id: $owner) {
			id
			symbol
			name
			tokens(first: ${paging_by}, where: { identifier_gte: ${paging_from}, identifier_lt: ${paging_to} }) {
				id
				uri
				identifier
				owner {
					id
				}
				contract {
					id
				}
			}
		}
	}
`;

export const generateERC721ExchangeQuery = (
	chainId: SupportedChainId,
	paging_by = 999,
	paging_from = 0,
	paging_to: number = paging_from + paging_by
) => gql`
	query GetChainId${chainId}ContractListings($contract: String!) {
		account(id: $contract) {
			id
			contractSellOrders(first: ${paging_by}, where: { token_gte: ${paging_from}, token_lt: ${paging_to} }) {
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
			contractBuyOrders(first: ${paging_by}, where: { token_gte: ${paging_from}, token_lt: ${paging_to} }) {
				id
				buyer {
					id
				}
				owner {
					id
				}
				contract {
					id
				}
				token
				expiration
				offer
			}
		}
	}
`;

export const ChainSubgraphSets: { [K in SupportedChainId]: [EIP721: Subgraph, ERC721Exchange: Subgraph] } = {
	[SupportedChainId.BOBA]: [Subgraph.BOBA_MAINNET_EIP721, Subgraph.BOBA_RINKEBY_ERC721EXCHANGE],
	[SupportedChainId.BOBA_RINKEBY]: [Subgraph.BOBA_RINKEBY_EIP721, Subgraph.BOBA_RINKEBY_ERC721EXCHANGE]
};
