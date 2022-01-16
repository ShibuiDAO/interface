import { AlchemyProvider, JsonRpcProvider, Provider } from '@ethersproject/providers';
import { PinnedChainId, SupportedChainId } from 'constants/chains';

const bobaProvider = new JsonRpcProvider('https://lightning-replica.boba.network', SupportedChainId.BOBA);
const bobaRinkebyProvider = new JsonRpcProvider('https://rinkeby.boba.network/', SupportedChainId.BOBA_RINKEBY);

const mainnetAlchemyProvider = new AlchemyProvider(PinnedChainId.MAINNET, process.env.NEXT_PUBLIC_MAINNET_KEY);

export default function useProviders(): { [K in SupportedChainId | PinnedChainId]: Provider } {
	return {
		[SupportedChainId.BOBA]: bobaProvider,
		[SupportedChainId.BOBA_RINKEBY]: bobaRinkebyProvider,

		[PinnedChainId.MAINNET]: mainnetAlchemyProvider
	};
}
