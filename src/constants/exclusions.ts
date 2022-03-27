import { SupportedChainId } from './chains';

export const exlusions: { [CID in SupportedChainId]: string[] } = {
	28: [],
	288: ['0x2b503dd5b4a6fc491a1f9eb1e7b67b679b9d95ba']
};

export default exlusions;
