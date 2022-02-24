import { ApolloLink, HttpLink } from '@apollo/client';
import { Subgraph } from './graphprotocol/subgraphs';

export const bobaMainnetEIP721Link = new HttpLink({
	uri: Subgraph.BOBA_MAINNET_EIP721
});

export const bobaRinkebyEIP721Link = new HttpLink({
	uri: Subgraph.BOBA_RINKEBY_EIP721
});

export const bobaMainnetERC721ExchangeLink = new HttpLink({
	uri: Subgraph.BOBA_MAINNET_ERC721EXCHANGE
});

export const bobaRinkebyERC721ExchangeLink = new HttpLink({
	uri: Subgraph.BOBA_RINKEBY_ERC721EXCHANGE
});

const bobaRinkebyERC721Exchange_bobaMainnetEIP721 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.BOBA_RINKEBY_ERC721EXCHANGE,
	bobaRinkebyERC721ExchangeLink,
	bobaMainnetEIP721Link
);

export const bobaMainnetERC721Exchange_bobaRinkebyERC721Exchange = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.BOBA_MAINNET_ERC721EXCHANGE,
	bobaMainnetERC721ExchangeLink,
	bobaRinkebyERC721Exchange_bobaMainnetEIP721
);

export const bobaRinkebyEIP721_bobaMainnetERC721Exchange = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.BOBA_RINKEBY_EIP721,
	bobaRinkebyEIP721Link,
	bobaMainnetERC721Exchange_bobaRinkebyERC721Exchange
);

export const bobaMainnetEIP721_bobaRinkebyEIP721 = ApolloLink.split(
	(op) => {
		const context = op.getContext();
		return !context || context.subgraph === Subgraph.BOBA_MAINNET_EIP721;
	},
	bobaMainnetEIP721Link,
	bobaRinkebyEIP721_bobaMainnetERC721Exchange
);

export const baseLink = bobaMainnetEIP721_bobaRinkebyEIP721;
