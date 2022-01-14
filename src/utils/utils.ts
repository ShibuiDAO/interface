import { CHAIN_INFO, SupportedChainId } from 'constants/chains';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function shortenHex(hex: string, length = 4) {
	return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}

export enum ExplorerType {
	Account,
	Transaction,
	Block
}

export type ExplorerData = [chainId: SupportedChainId, address: string];

export function formatExplorerLink(type: ExplorerType, data: ExplorerData) {
	switch (type) {
		case ExplorerType.Account: {
			const [chainId, address] = data;
			return `https://${CHAIN_INFO[chainId].explorer}/address/${address}`;
		}
		case ExplorerType.Transaction: {
			const [chainId, hash] = data;
			return `https://${CHAIN_INFO[chainId].explorer}/tx/${hash}`;
		}
		case ExplorerType.Block: {
			const [chainId, block] = data;
			return `https://${CHAIN_INFO[chainId].explorer}/block/${block}`;
		}
	}
}
