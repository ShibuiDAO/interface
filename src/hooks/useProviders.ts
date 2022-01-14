import { JsonRpcProvider, Provider } from '@ethersproject/providers';
import { SupportedChainId } from 'constants/chains';

const bobaProvider = new JsonRpcProvider('https://lightning-replica.boba.network', SupportedChainId.BOBA);
const bobaRinkebyProvider = new JsonRpcProvider('https://rinkeby.boba.network/', SupportedChainId.BOBA_RINKEBY);

export default function useProviders(): { [K in SupportedChainId]: Provider } {
	return {
		[SupportedChainId.BOBA]: bobaProvider,
		[SupportedChainId.BOBA_RINKEBY]: bobaRinkebyProvider
	};
}
