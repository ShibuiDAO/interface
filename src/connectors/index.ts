import type { TorusParams } from '@toruslabs/torus-embed';
import { InjectedConnector } from '@web3-react/injected-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { ALL_SUPPORTED_CHAIN_IDS, CHAIN_INFO, RPC_URLS, SupportedChainId } from 'constants/chains';
import SHIBUI_LOGO from 'public/logo.svg';

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

export const torus = new TorusConnector({
	chainId: SupportedChainId.BOBA,
	initOptions: {
		network: {
			host: CHAIN_INFO[SupportedChainId.BOBA].addNetworkInfo.rpcUrl,
			chainId: SupportedChainId.BOBA,
			networkName: CHAIN_INFO[SupportedChainId.BOBA].label,
			blockExplorer: CHAIN_INFO[SupportedChainId.BOBA].explorer
		},
		whiteLabel: {
			theme: {
				isDark: true,
				colors: {
					torusBrand1: '#FDA360P'
				}
			},
			logoDark: './logo.svg',
			logoLight: './logo.svg'
		}
	} as TorusParams
});
