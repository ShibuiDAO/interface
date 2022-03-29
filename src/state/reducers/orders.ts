import type { Provider } from '@ethersproject/providers';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepClone } from '@sapphire/utilities';
import { BuyOrder, SellOrder } from '@shibuidao/erc721exchange-types';
import { ABI, ABIs } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { ERC721_EXCHANGE } from 'constants/contracts';
import { ZERO_ADDRESS } from 'constants/misc';
import { BigNumberish, Contract, errors } from 'ethers';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from 'state';
import { exchangeContract } from 'utils/contracts';
import { setApprovalForAllTxw } from './approvals';
import { TRANSACTION_THRUNK_PREFIX } from './transactions';

export interface SimpleSellOrder {
	id: string;
	seller: { id: string };
	contract: { id: string };
	token: BigInt;
	expiration: BigInt;
	price: BigInt;
}

export interface SimpleBuyOrder {
	id: string;
	buyer: { id: string };
	owner: { id: string };
	contract: { id: string };
	token: BigInt;
	expiration: BigInt;
	offer: BigInt;
}

export enum OrderDirection {
	DISPLAY,
	APPROVE,
	BOOK,
	CANCEL,
	EXERCISE
}

export interface OrderInitiate<Direction extends OrderDirection = OrderDirection.APPROVE> {
	title?: string;
	ordering: boolean;
	approved?: boolean;
	seller?: Direction extends OrderDirection.EXERCISE ? string : never;
	recipient?: Direction extends OrderDirection.EXERCISE ? string : never;
	contract: string;
	identifier: string;
	expiration?: Direction extends OrderDirection.EXERCISE ? string : never;
	price?: Direction extends OrderDirection.EXERCISE ? string : never;
	direction: OrderDirection;
}

export const defaultOrder: OrderInitiate<OrderDirection.APPROVE> = {
	ordering: false,
	approved: false,
	contract: '',
	identifier: '1',
	direction: OrderDirection.APPROVE
};

export interface OrdersState {
	sellOrders: { [K: string]: SimpleSellOrder | undefined };
	buyOrders: { [K: string]: SimpleBuyOrder | undefined };
	currentOrder: OrderInitiate;
}

const initialState: OrdersState = {
	sellOrders: {},
	buyOrders: {},
	currentOrder: defaultOrder
};

const commitSellOrder = (state: WritableDraft<OrdersState>, order: SellOrder): WritableDraft<OrdersState> => {
	state.sellOrders[`${order.contract.id}-${order.token}-SELL`] = {
		id: order.id,
		seller: { id: order.seller.id },
		contract: { id: order.contract.id },
		token: order.token,
		expiration: order.expiration,
		price: order.price
	};

	return state;
};

const commitBuyOrder = (state: WritableDraft<OrdersState>, order: BuyOrder): WritableDraft<OrdersState> => {
	state.buyOrders[`${order.contract.id}-${order.token}-BUY`] = {
		id: order.id,
		buyer: { id: order.buyer.id },
		owner: { id: order.owner.id },
		contract: { id: order.contract.id },
		token: order.token,
		expiration: order.expiration,
		offer: order.offer
	};

	return state;
};

export interface FetchContractOrderApprovalParameters {
	contract: string;
	owner: string;
	operator: string;
	provider: Provider;
}

export const fetchCurrentOrderApprovalStatusTxr = createAsyncThunk<boolean, FetchContractOrderApprovalParameters>(
	'fetch/order/approval',
	async ({ contract, owner, operator, provider }) => {
		const collection = new Contract(contract, ABIs[ABI.EIP721], provider);

		const isApproved: boolean = await collection.isApprovedForAll(owner, operator);

		return isApproved;
	}
);

export interface SellOrderData {
	tokenContractAddress: string;
	tokenId: BigNumberish;
	expiration: BigNumberish;
	price: BigNumberish;
}

export interface CreateOrderSellParameters {
	chainId: SupportedChainId;
	library: JsonRpcProvider;

	data: SellOrderData;
}

export const createSellOrderTxw = createAsyncThunk<any, CreateOrderSellParameters>(
	`${TRANSACTION_THRUNK_PREFIX}create/order/sell`,
	async ({ chainId, library, data }, { rejectWithValue }) => {
		const exchange = exchangeContract(ERC721_EXCHANGE[chainId], library.getSigner());
		try {
			const tx: TransactionResponse = await exchange.bookSellOrder(
				data.tokenContractAddress,
				data.tokenId,
				data.expiration,
				data.price,
				ZERO_ADDRESS
			);

			try {
				await tx.wait();
			} catch (callException: any) {
				if (callException.code === errors.CALL_EXCEPTION) {
					return rejectWithValue(['Transaction execution failed', callException]);
				}
				throw callException;
			}
		} catch (transactionError) {
			return rejectWithValue(['Method call failed', transactionError]);
		}

		return true;
	}
);

export interface SellOrderCancellationData {
	tokenContractAddress: string;
	tokenId: BigNumberish;
}

export interface CancelOrderSellParameters {
	chainId: SupportedChainId;
	library: JsonRpcProvider;

	data: SellOrderCancellationData;
}

export const cancelSellOrderTxw = createAsyncThunk<true, CancelOrderSellParameters>(
	`${TRANSACTION_THRUNK_PREFIX}cancel/order/sell`,
	async ({ chainId, library, data }, { rejectWithValue }) => {
		const exchange = exchangeContract(ERC721_EXCHANGE[chainId], library.getSigner());
		try {
			const tx: TransactionResponse = await exchange.cancelSellOrder(data.tokenContractAddress, data.tokenId);

			try {
				await tx.wait();
			} catch (callException: any) {
				if (callException.code === errors.CALL_EXCEPTION) {
					return rejectWithValue(['Transaction execution failed', callException]);
				}
				throw callException;
			}
		} catch (transactionError) {
			return rejectWithValue(['Method call failed', transactionError]);
		}

		return true;
	}
);

export interface SellOrderExecutionData {
	seller: string;
	tokenContractAddress: string;
	tokenId: BigNumberish;
	expiration: BigNumberish;
	price: BigNumberish;
	recipient: string;
}

export interface ExecuteOrderSellParameters {
	chainId: SupportedChainId;
	library: JsonRpcProvider;

	data: SellOrderExecutionData;
}

export const executeSellOrderTxw = createAsyncThunk<true, ExecuteOrderSellParameters>(
	`${TRANSACTION_THRUNK_PREFIX}execute/order/sell`,
	async ({ chainId, library, data }, { rejectWithValue }) => {
		const exchange = exchangeContract(ERC721_EXCHANGE[chainId], library.getSigner());
		try {
			const tx: TransactionResponse = await exchange.exerciseSellOrder(
				data.seller,
				data.tokenContractAddress,
				data.tokenId,
				data.expiration,
				data.price,
				data.recipient,
				ZERO_ADDRESS,
				{ value: data.price }
			);

			try {
				await tx.wait();
			} catch (callException: any) {
				if (callException.code === errors.CALL_EXCEPTION) {
					return rejectWithValue(['Transaction execution failed', callException]);
				}
				throw callException;
			}
		} catch (transactionError) {
			return rejectWithValue(['Method call failed', transactionError]);
		}

		return true;
	}
);

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		resetSellOrders: (state) => {
			state.sellOrders = {};
		},
		fillSellOrders: (state, action: PayloadAction<readonly SellOrder[]>) => {
			resetSellOrders();
			for (const sellOrder of action.payload) {
				state = commitSellOrder(state, sellOrder);
			}
		},
		setSellOrder: (state, action: PayloadAction<SellOrder>) => {
			state = commitSellOrder(state, action.payload);
		},
		resetBuyOrders: (state) => {
			state.buyOrders = {};
		},
		fillBuyOrders: (state, action: PayloadAction<readonly BuyOrder[]>) => {
			resetBuyOrders();
			for (const buyOrder of action.payload) {
				state = commitBuyOrder(state, buyOrder);
			}
		},
		setBuyOrder: (state, action: PayloadAction<BuyOrder>) => {
			state = commitBuyOrder(state, action.payload);
		},

		setCurrentOrder: (state, action: PayloadAction<OrderInitiate>) => {
			state.currentOrder = action.payload;
		},
		updateCurrentOrderDirection: (state, action: PayloadAction<OrderDirection>) => {
			state.currentOrder.direction = action.payload;
		},
		clearOrder: (state) => {
			state.currentOrder = deepClone(defaultOrder);
		}
	},
	// TODO: Use case outputs
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrentOrderApprovalStatusTxr.fulfilled, (state, action) => {
				state.currentOrder.approved = action.payload;
			})
			.addCase(setApprovalForAllTxw.fulfilled, (state, action) => {
				if (action.meta.arg.contract === state.currentOrder.contract) {
					state.currentOrder.approved = true;
					state.currentOrder.direction = OrderDirection.BOOK;
				}
			});
	}
});

export const {
	resetSellOrders,
	fillSellOrders,
	setSellOrder,
	resetBuyOrders,
	fillBuyOrders,
	setBuyOrder,
	setCurrentOrder,
	updateCurrentOrderDirection,
	clearOrder
} = ordersSlice.actions;

export const selectSellOrder = (contract: string, identifier: BigInt) => (state: RootState) =>
	state.orders.sellOrders[`${contract}-${identifier}-SELL`];
export const selectBuyOrder = (contract: string, identifier: BigInt) => (state: RootState /* */) =>
	state.orders.buyOrders[`${contract}-${identifier}-BUY`];

export const selectOrderingStatus =
	<Direction extends OrderDirection = OrderDirection.DISPLAY>() =>
	(state: RootState) =>
		state.orders.currentOrder as OrderInitiate<Direction>;

export default ordersSlice.reducer;
