import { SupportedChainId } from './chains';

const BOBA_MAINNET_ERC721_EXCHANGE = '0x02af48a420f0934ecfc1c34f6da83db1e3e56af7';
const BOBA_RINKEBY_ERC721_EXCHANGE = '0x76352a916b57800732d5f16d9b511c506ded850c';

export const ERC721_EXCHANGE: { [K in SupportedChainId]: `0x${string}` } = {
	[SupportedChainId.BOBA]: BOBA_MAINNET_ERC721_EXCHANGE,
	[SupportedChainId.BOBA_RINKEBY]: BOBA_RINKEBY_ERC721_EXCHANGE
};
