import { SupportedChainId } from './chains';

const BOBA_ERC721_EXCHANGE = '0x';
const BOBA_RINKEBY_ERC721_EXCHANGE = '0xc2dbc6653a650d76f88e99f3b77422d2e37e8456';

export const ERC721_EXCHANGE: { [K in SupportedChainId]: `0x${string}` } = {
	[SupportedChainId.BOBA]: BOBA_ERC721_EXCHANGE,
	[SupportedChainId.BOBA_RINKEBY]: BOBA_RINKEBY_ERC721_EXCHANGE
};
