import { Erc721Contract } from '@subgraphs/eip721-matic';
import { SupportedChainId } from 'constants/chains';
import exlusions from 'constants/exclusions';

export const filterExlusions = (chainId: SupportedChainId) => (collection: Erc721Contract) =>
	!exlusions[chainId].includes(collection.id.toLowerCase());
