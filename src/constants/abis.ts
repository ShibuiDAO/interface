import type { ContractInterface } from 'ethers';

export const TOKEN_BASE_ABI = [
	{
		inputs: [],
		name: 'name',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'symbol',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	}
];
export const TOKEN_BASE_ABI_STRING = TOKEN_BASE_ABI.toString();

export const EIP721_BASIC_ABI = [
	...TOKEN_BASE_ABI,
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'tokenURI',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];
export const EIP721_BASIC_ABI_STRING = EIP721_BASIC_ABI.toString();

export const EIP1155_BASIC_ABI = [
	...TOKEN_BASE_ABI,
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_id',
				type: 'uint256'
			}
		],
		name: 'uri',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	}
];
export const EIP1155_BASIC_ABI_STRING = EIP1155_BASIC_ABI.toString();

export enum ABI {
	Base,
	EIP721,
	EIP1155
}

export const ABIs: { [K in ABI]: ContractInterface } = {
	[ABI.Base]: TOKEN_BASE_ABI,
	[ABI.EIP721]: EIP721_BASIC_ABI,
	[ABI.EIP1155]: EIP1155_BASIC_ABI,
};

export const uriMethods: { [K in ABI]: 'tokenURI' | 'uri' | '' } = {
	[ABI.Base]: '',
	[ABI.EIP721]: 'tokenURI',
	[ABI.EIP1155]: 'uri',
};
