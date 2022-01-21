import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { ALL_SUPPORTED_CHAIN_IDS, RPC_URLS, SupportedChainId } from 'constants/chains';
import SHIBUI_LOGO from './public/logo.svg';

export const metamask = new InjectedConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS
});

export const walletConnect = new WalletConnectConnector({
	supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
	rpc: RPC_URLS,
	qrcode: true
});

export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[SupportedChainId.BOBA],
	appName: 'ShibuiNFT',
	appLogoUrl: SHIBUI_LOGO,
	supportedChainIds: [SupportedChainId.BOBA]
});
