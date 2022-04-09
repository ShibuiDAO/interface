import { SupportedChainId } from './chains';

export const exlusions: { [CID in SupportedChainId]: string[] } = {
	28: [],
	288: ['0x2b503dd5b4a6fc491a1f9eb1e7b67b679b9d95ba', '0x0b745239764097cdde9691d91a81745ce8022036', '0x317c5ea002dee83704207a022c942cdba29edb4b']
};

export default exlusions;
