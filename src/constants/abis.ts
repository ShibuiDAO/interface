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
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'operator',
				type: 'address'
			},
			{
				internalType: 'bool',
				name: 'approved',
				type: 'bool'
			}
		],
		name: 'setApprovalForAll',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'operator',
				type: 'address'
			}
		],
		name: 'isApprovedForAll',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
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

export const ERC721_EXCHANGE_ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'buyer',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'seller',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'offer',
				type: 'uint256'
			}
		],
		name: 'BuyOrderAccepted',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'buyer',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'expiration',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'offer',
				type: 'uint256'
			}
		],
		name: 'BuyOrderBooked',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'buyer',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'BuyOrderCanceled',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'buyer',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'expiration',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'offer',
				type: 'uint256'
			}
		],
		name: 'BuyOrderUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'executor',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'newRoyaltiesAmount',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'oldRoyaltiesAmount',
				type: 'uint256'
			}
		],
		name: 'CollectionRoyaltyFeeAmountUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'executor',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newPayoutAddress',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'oldPayoutAddress',
				type: 'address'
			}
		],
		name: 'CollectionRoyaltyPayoutAddressUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'OwnershipTransferred',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'Paused',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'seller',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'expiration',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'price',
				type: 'uint256'
			}
		],
		name: 'SellOrderBooked',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'seller',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			}
		],
		name: 'SellOrderCanceled',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'seller',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'recipient',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'buyer',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'price',
				type: 'uint256'
			}
		],
		name: 'SellOrderFufilled',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'seller',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'tokenContractAddress',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'uint256',
				name: 'tokenId',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'expiration',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'price',
				type: 'uint256'
			}
		],
		name: 'SellOrderUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'Unpaused',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '__maxRoyaltyPerMille',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '__systemFeePerMille',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: '__wethAddress',
				type: 'address'
			}
		],
		name: '__ERC721Exchange_init',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address payable',
				name: '_bidder',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_expiration',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_offer',
				type: 'uint256'
			}
		],
		name: 'acceptBuyOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_buyer',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			}
		],
		name: 'buyOrderExists',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			}
		],
		name: 'cancelBuyOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			}
		],
		name: 'cancelSellOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address payable',
				name: '_owner',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_expiration',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_offer',
				type: 'uint256'
			}
		],
		name: 'createBuyOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_expiration',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_price',
				type: 'uint256'
			}
		],
		name: 'createSellOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address payable',
				name: '_seller',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_expiration',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_price',
				type: 'uint256'
			},
			{
				internalType: 'address payable',
				name: '_recipient',
				type: 'address'
			}
		],
		name: 'executeSellOrder',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_buyer',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			}
		],
		name: 'getBuyOrder',
		outputs: [
			{
				components: [
					{
						internalType: 'address payable',
						name: 'owner',
						type: 'address'
					},
					{
						internalType: 'uint256',
						name: 'expiration',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'offer',
						type: 'uint256'
					}
				],
				internalType: 'struct ERC721ExchangeUpgradeable.BuyOrder',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			}
		],
		name: 'getRoyaltyPayoutAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			}
		],
		name: 'getRoyaltyPayoutRate',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_seller',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			}
		],
		name: 'getSellOrder',
		outputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'expiration',
						type: 'uint256'
					},
					{
						internalType: 'uint256',
						name: 'price',
						type: 'uint256'
					}
				],
				internalType: 'struct ERC721ExchangeUpgradeable.SellOrder',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'pause',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'paused',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_seller',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			}
		],
		name: 'sellOrderExists',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'address payable',
				name: '_payoutAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_payoutPerMille',
				type: 'uint256'
			}
		],
		name: 'setRoyalty',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_newSystemFeePerMille',
				type: 'uint256'
			}
		],
		name: 'setSystemFeePerMille',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address payable',
				name: '_newSystemFeeWallet',
				type: 'address'
			}
		],
		name: 'setSystemFeeWallet',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address'
			}
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'unpause',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address payable',
				name: '_owner',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_expiration',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_offer',
				type: 'uint256'
			}
		],
		name: 'updateBuyOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenContractAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokenId',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_expiration',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_price',
				type: 'uint256'
			}
		],
		name: 'updateSellOrder',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'version',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
export const ERC721_EXCHANGE_ABI_STRING = ERC721_EXCHANGE_ABI.toString();

export enum ABI {
	Base,
	EIP721,
	ERC721_EXCHANGE,
	EIP1155
}

export const ABIs: { [K in ABI]: ContractInterface } = {
	[ABI.Base]: TOKEN_BASE_ABI,
	[ABI.EIP721]: EIP721_BASIC_ABI,
	[ABI.ERC721_EXCHANGE]: ERC721_EXCHANGE_ABI,
	[ABI.EIP1155]: EIP1155_BASIC_ABI
};

export const uriMethods: { [K in ABI]: 'tokenURI' | 'uri' | '' } = {
	[ABI.Base]: '',
	[ABI.EIP721]: 'tokenURI',
	[ABI.ERC721_EXCHANGE]: '',
	[ABI.EIP1155]: 'uri'
};
