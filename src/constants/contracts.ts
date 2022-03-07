import { SupportedChainId } from './chains';

const BOBA_MAINNET_ERC721_EXCHANGE = '0x02af48a420f0934ecfc1c34f6da83db1e3e56af7';
const BOBA_RINKEBY_ERC721_EXCHANGE = '0x34755A949E68b18F585eB91711351b697C1563d5';

export const ERC721_EXCHANGE: { [K in SupportedChainId]: `0x${string}` } = {
	[SupportedChainId.BOBA]: BOBA_MAINNET_ERC721_EXCHANGE,
	[SupportedChainId.BOBA_RINKEBY]: BOBA_RINKEBY_ERC721_EXCHANGE
};
