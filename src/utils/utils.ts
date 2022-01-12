import { SupportedChainId } from 'constants/chains';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function shortenHex(hex: string, length = 4) {
	return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}

const ETHERSCAN_DOMAINS: Record<number, string> = {
	[SupportedChainId.BOBA]: ''
	// [SupportedChainId.AvalancheMainnet]: 'snowtrace.io'
};

export enum EtherscanType {
	Account,
	Transaction,
	Block
}

export type EtherscanData = [chainId: number, address: string];

export function formatEtherscanLink(type: EtherscanType, data: EtherscanData) {
	switch (type) {
		case EtherscanType.Account: {
			const [chainId, address] = data;
			return `https://${ETHERSCAN_DOMAINS[chainId]}/address/${address}`;
		}
		case EtherscanType.Transaction: {
			const [chainId, hash] = data;
			return `https://${ETHERSCAN_DOMAINS[chainId]}/tx/${hash}`;
		}
		case EtherscanType.Block: {
			const [chainId, block] = data;
			return `https://${ETHERSCAN_DOMAINS[chainId]}/block/${block}`;
		}
	}
}
