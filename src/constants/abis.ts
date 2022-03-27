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
	},
	{
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
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
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor'
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
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address'
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
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address'
			}
		],
		name: 'BuyOrderExercised',
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
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address'
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
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'token',
				type: 'address'
			}
		],
		name: 'SellOrderExercised',
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
				internalType: 'address',
				name: '_systemFeeWallet',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_systemFeePerMille',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: '_royaltyEngine',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_orderBook',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_wethAddress',
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
			},
			{
				internalType: 'address',
				name: '_token',
				type: 'address'
			}
		],
		name: 'bookBuyOrder',
		outputs: [],
		stateMutability: 'payable',
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
			},
			{
				internalType: 'address',
				name: '_token',
				type: 'address'
			}
		],
		name: 'bookSellOrder',
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
		stateMutability: 'payable',
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
		stateMutability: 'payable',
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
			},
			{
				internalType: 'address',
				name: '_token',
				type: 'address'
			}
		],
		name: 'exerciseBuyOrder',
		outputs: [],
		stateMutability: 'payable',
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
				internalType: 'address',
				name: '_recipient',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_token',
				type: 'address'
			}
		],
		name: 'exerciseSellOrder',
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
						internalType: 'address',
						name: 'token',
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
				internalType: 'struct IERC721Exchange.BuyOrder',
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
					},
					{
						internalType: 'address',
						name: 'token',
						type: 'address'
					}
				],
				internalType: 'struct IERC721Exchange.SellOrder',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'goTowardsTheSunset',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'orderBook',
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
		inputs: [],
		name: 'royaltyEngine',
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
				name: '_newOrderBook',
				type: 'address'
			}
		],
		name: 'setOrderBook',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_newRoyaltyEngine',
				type: 'address'
			}
		],
		name: 'setRoyaltyEngine',
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
		inputs: [],
		name: 'sunset',
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
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4'
			}
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'pure',
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
		inputs: [],
		name: 'version',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [],
		name: 'wETH',
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
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
export const ERC721_EXCHANGE_ABI_STRING = ERC721_EXCHANGE_ABI.toString();

export const L2_NFT_BRIDGE_ABI = [
	{ type: 'constructor', stateMutability: 'nonpayable', inputs: [] },
	{
		type: 'event',
		name: 'DepositFailed',
		inputs: [
			{
				type: 'address',
				name: '_l1Token',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_l2Token',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_to',
				internalType: 'address',
				indexed: false
			},
			{
				type: 'uint256',
				name: '_tokenId',
				internalType: 'uint256',
				indexed: false
			},
			{
				type: 'bytes',
				name: '_data',
				internalType: 'bytes',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'DepositFinalized',
		inputs: [
			{
				type: 'address',
				name: '_l1Token',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_l2Token',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_to',
				internalType: 'address',
				indexed: false
			},
			{
				type: 'uint256',
				name: '_tokenId',
				internalType: 'uint256',
				indexed: false
			},
			{
				type: 'bytes',
				name: '_data',
				internalType: 'bytes',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Paused',
		inputs: [
			{
				type: 'address',
				name: 'account',
				internalType: 'address',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Unpaused',
		inputs: [
			{
				type: 'address',
				name: 'account',
				internalType: 'address',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'WithdrawalInitiated',
		inputs: [
			{
				type: 'address',
				name: '_l1Token',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_l2Token',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: '_to',
				internalType: 'address',
				indexed: false
			},
			{
				type: 'uint256',
				name: '_tokenId',
				internalType: 'uint256',
				indexed: false
			},
			{
				type: 'bytes',
				name: '_data',
				internalType: 'bytes',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'configureExtraGasRelay',
		inputs: [{ type: 'uint256', name: '_extraGasRelay', internalType: 'uint256' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'configureGas',
		inputs: [{ type: 'uint32', name: '_exitL1Gas', internalType: 'uint32' }]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint32', name: '', internalType: 'uint32' }],
		name: 'exitL1Gas',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'exits',
		inputs: [
			{ type: 'address', name: '', internalType: 'address' },
			{ type: 'uint256', name: '', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'extraGasRelay',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'finalizeDeposit',
		inputs: [
			{ type: 'address', name: '_l1Contract', internalType: 'address' },
			{ type: 'address', name: '_l2Contract', internalType: 'address' },
			{ type: 'address', name: '_from', internalType: 'address' },
			{ type: 'address', name: '_to', internalType: 'address' },
			{ type: 'uint256', name: '_tokenId', internalType: 'uint256' },
			{ type: 'bytes', name: '_data', internalType: 'bytes' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'initialize',
		inputs: [
			{
				type: 'address',
				name: '_l2CrossDomainMessenger',
				internalType: 'address'
			},
			{ type: 'address', name: '_l1NFTBridge', internalType: 'address' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'l1NFTBridge',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'messenger',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bytes4', name: '', internalType: 'bytes4' }],
		name: 'onERC721Received',
		inputs: [
			{ type: 'address', name: '', internalType: 'address' },
			{ type: 'address', name: '', internalType: 'address' },
			{ type: 'uint256', name: '', internalType: 'uint256' },
			{ type: 'bytes', name: '', internalType: 'bytes' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'owner',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [
			{ type: 'address', name: 'l1Contract', internalType: 'address' },
			{ type: 'address', name: 'l2Contract', internalType: 'address' },
			{
				type: 'uint8',
				name: 'baseNetwork',
				internalType: 'enum L2NFTBridge.Network'
			}
		],
		name: 'pairNFTInfo',
		inputs: [{ type: 'address', name: '', internalType: 'address' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'pause',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'paused',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'registerNFTPair',
		inputs: [
			{ type: 'address', name: '_l1Contract', internalType: 'address' },
			{ type: 'address', name: '_l2Contract', internalType: 'address' },
			{ type: 'string', name: '_baseNetwork', internalType: 'string' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'transferOwnership',
		inputs: [{ type: 'address', name: '_newOwner', internalType: 'address' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'unpause',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'withdraw',
		inputs: [
			{ type: 'address', name: '_l2Contract', internalType: 'address' },
			{ type: 'uint256', name: '_tokenId', internalType: 'uint256' },
			{ type: 'uint32', name: '_l1Gas', internalType: 'uint32' },
			{ type: 'bytes', name: '_data', internalType: 'bytes' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'withdrawTo',
		inputs: [
			{ type: 'address', name: '_l2Contract', internalType: 'address' },
			{ type: 'address', name: '_to', internalType: 'address' },
			{ type: 'uint256', name: '_tokenId', internalType: 'uint256' },
			{ type: 'uint32', name: '_l1Gas', internalType: 'uint32' },
			{ type: 'bytes', name: '_data', internalType: 'bytes' }
		]
	}
];
export const L2_NFT_BRIDGE_ABI_STRING = L2_NFT_BRIDGE_ABI.toString();

export enum ABI {
	Base,
	EIP721,
	ERC721_EXCHANGE,
	EIP1155,
	L2_NFT_BRIDGE
}

export const ABIs: { [K in ABI]: ContractInterface } = {
	[ABI.Base]: TOKEN_BASE_ABI,
	[ABI.EIP721]: EIP721_BASIC_ABI,
	[ABI.ERC721_EXCHANGE]: ERC721_EXCHANGE_ABI,
	[ABI.EIP1155]: EIP1155_BASIC_ABI,
	[ABI.L2_NFT_BRIDGE]: L2_NFT_BRIDGE_ABI
};

export const uriMethods: { [K in ABI]: 'tokenURI' | 'uri' | '' } = {
	[ABI.Base]: '',
	[ABI.EIP721]: 'tokenURI',
	[ABI.ERC721_EXCHANGE]: '',
	[ABI.EIP1155]: 'uri',
	[ABI.L2_NFT_BRIDGE]: ''
};
