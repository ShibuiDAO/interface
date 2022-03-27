import { SupportedChainId } from './chains';

export const customLogos: { [CID in SupportedChainId]: { [K: string]: string } } = {
	28: {},
	288: {
		'0xce458fc7cfc322cdd65ec77cf7b6410002e2d793': 'turingMonsters.jpeg'
	}
};

export default customLogos;
