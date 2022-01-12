// import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ALL_SUPPORTED_CHAIN_IDS } from 'constants/chains';

// export const gnosisSafe = new SafeAppConnector();

export const metamask = new InjectedConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
});
