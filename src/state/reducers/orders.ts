import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SellOrder } from '@tapioca-market/erc721exchange-types';
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

interface OrdersState {
	sellOrders: { [K: string]: SimpleSellOrder | undefined };
}

const initialState: OrdersState = {
	sellOrders: {}
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

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		fillSellOrders: (state, action: PayloadAction<readonly SellOrder[]>) => {
			for (const sellOrder of action.payload) {
				state = commitSellOrder(state, sellOrder);
			}
		},
		setSellOrder: (state, action: PayloadAction<SellOrder>) => {
			state = commitSellOrder(state, action.payload);
		}
	}
});

export const { fillSellOrders, setSellOrder } = ordersSlice.actions;

export const selectSellOrder = (contract: string, identifier: BigInt) => (state: RootState) =>
	state.orders.sellOrders[`${contract}-${identifier}-SELL`];

export default ordersSlice.reducer;
