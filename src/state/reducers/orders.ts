import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deepClone } from '@sapphire/utilities';
import { BuyOrder, SellOrder } from '@shibuidao/erc721exchange-types';
import { ABI, ABIs } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { ERC721_EXCHANGE } from 'constants/contracts';
import { BigNumberish, Contract, errors } from 'ethers';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from 'state';

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
	BOOK,
	EXECUTE
}

export interface OrderInitiate {
	ordering: boolean;
	user?: string;
	contract: string;
	identifier: string;
	direction: OrderDirection;
}

export const defaultOrder: OrderInitiate = {
	ordering: false,
	contract: '',
	identifier: '1',
	direction: OrderDirection.BOOK
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

export const createSellOrder = createAsyncThunk<any, CreateOrderSellParameters>(
	'create/order/sell',
	async ({ chainId, library, data }, { rejectWithValue }) => {
		const exchange = new Contract(ERC721_EXCHANGE[chainId], ABIs[ABI.ERC721_EXCHANGE], library.getSigner());
		try {
			const tx: TransactionResponse = await exchange.createSellOrder(data.tokenContractAddress, data.tokenId, data.expiration, data.price);

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

export const executeSellOrder = createAsyncThunk<any, ExecuteOrderSellParameters>(
	'execute/order/sell',
	async ({ chainId, library, data }, { rejectWithValue }) => {
		const exchange = new Contract(ERC721_EXCHANGE[chainId], ABIs[ABI.ERC721_EXCHANGE], library.getSigner());
		try {
			const tx: TransactionResponse = await exchange.executeSellOrder(
				data.seller,
				data.tokenContractAddress,
				data.tokenId,
				data.expiration,
				data.price,
				data.recipient,
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
		clearOrder: (state) => {
			state.currentOrder = deepClone(defaultOrder);
		}
	},
	// TODO: Use case outputs
	extraReducers: (builder) => {
		builder.addCase(createSellOrder.pending, (_, action) => {
			clearOrder();
			console.log(action.payload);
			console.log(action.meta.arg);
		});
		builder.addCase(createSellOrder.rejected, (_, action) => {
			console.log(action.payload);
			console.log(action.meta.arg);
		});
		builder.addCase(createSellOrder.fulfilled, (_, action) => {
			console.log(action.payload);
		});

		builder.addCase(executeSellOrder.pending, (_, action) => {
			// clearOrder();
			console.log(action.payload);
			console.log(action.meta.arg);
		});
		builder.addCase(executeSellOrder.rejected, (_, action) => {
			console.log(action.payload);
			console.log(action.meta.arg);
		});
		builder.addCase(executeSellOrder.fulfilled, (_, action) => {
			console.log(action.payload);
		});
	}
});

export const { resetSellOrders, fillSellOrders, setSellOrder, resetBuyOrders, fillBuyOrders, setBuyOrder, setCurrentOrder, clearOrder } =
	ordersSlice.actions;

export const selectSellOrder = (contract: string, identifier: BigInt) => (state: RootState) =>
	state.orders.sellOrders[`${contract}-${identifier}-SELL`];
export const selectBuyOrder = (contract: string, identifier: BigInt) => (state: RootState /* */) =>
	state.orders.buyOrders[`${contract}-${identifier}-BUY`];

export const selectOrderingStatus = (state: RootState) => state.orders.currentOrder;

export default ordersSlice.reducer;
