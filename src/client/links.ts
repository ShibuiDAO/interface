import { HttpLink } from '@apollo/client';
import { Subgraph } from './graphprotocol/subgraphs';

export const bobaEIP721Link = new HttpLink({
	uri: Subgraph.BOBA_EIP721
});


export const baseLink = bobaEIP721Link;
