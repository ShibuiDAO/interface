import { ApolloLink, HttpLink } from '@apollo/client';
import { Subgraph } from './graphprotocol/subgraphs';

export const bobaMainnetEIP721Link = new HttpLink({
	uri: Subgraph.BOBA_MAINNET_EIP721
});

export const bobaRinkebyEIP721Link = new HttpLink({
	uri: Subgraph.BOBA_RINKEBY_EIP721
});

export const bobaRinkebyERC721ExchangeLink = new HttpLink({
	uri: Subgraph.BOBA_RINKEBY_ERC721EXCHANGE
});

const bobaRinkebyERC721Exchange_bobaMainnetEIP721 = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.BOBA_RINKEBY_ERC721EXCHANGE,
	bobaRinkebyERC721ExchangeLink,
	bobaMainnetEIP721Link
);

export const bobaRinkebyEIP721_bobaRinkebyERC721Exchange = ApolloLink.split(
	(op) => op.getContext().subgraph === Subgraph.BOBA_RINKEBY_EIP721,
	bobaRinkebyEIP721Link,
	bobaRinkebyERC721Exchange_bobaMainnetEIP721
);

export const bobaMainnetEIP721_bobaRinkebyEIP721 = ApolloLink.split(
	(op) => {
		const context = op.getContext();
		return !context || context.subgraph === Subgraph.BOBA_MAINNET_EIP721;
	},
	bobaMainnetEIP721Link,
	bobaRinkebyEIP721_bobaRinkebyERC721Exchange
);

export const baseLink = bobaMainnetEIP721_bobaRinkebyEIP721;
