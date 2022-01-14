import { InjectedConnector } from '@web3-react/injected-connector';
import { ALL_SUPPORTED_CHAIN_IDS } from 'constants/chains';

export const metamask = new InjectedConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
});
