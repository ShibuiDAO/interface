import { SupportedChainId } from './chains';

export const customLogos: { [CID in SupportedChainId]: { [K: string]: string } } = {
	28: {},
	288: {
		'0xce458fc7cfc322cdd65ec77cf7b6410002e2d793': 'turingMonsters.jpeg',
		'0x2aa5d15eb36e5960d056e8fea6e7bb3e2a06a351': 'hedgeys.jpeg'
	}
};

export default customLogos;
