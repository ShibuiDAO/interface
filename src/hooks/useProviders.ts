import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { SupportedChainId } from 'constants/chains';

const bobaProvider = new JsonRpcProvider('https://lightning-replica.boba.network', SupportedChainId.BOBA);

export default function useProviders(): { [K in SupportedChainId]: Provider } {
	return {
		[SupportedChainId.BOBA]: bobaProvider
	};
}
