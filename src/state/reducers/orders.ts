import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuyOrder, SellOrder } from '@shibuidao/erc721exchange-types';
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

interface OrdersState {
	sellOrders: { [K: string]: SimpleSellOrder | undefined };
	buyOrders: { [K: string]: SimpleBuyOrder | undefined };
}

const initialState: OrdersState = {
	sellOrders: {},
	buyOrders: {}
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
		},
		fillBuyOrders: (state, action: PayloadAction<readonly BuyOrder[]>) => {
			for (const buyOrder of action.payload) {
				state = commitBuyOrder(state, buyOrder);
			}
		},
		setBuyOrder: (state, action: PayloadAction<BuyOrder>) => {
			state = commitBuyOrder(state, action.payload);
		}
	}
});

export const { fillSellOrders, setSellOrder, fillBuyOrders, setBuyOrder } = ordersSlice.actions;

export const selectSellOrder = (contract: string, identifier: BigInt) => (state: RootState) =>
	state.orders.sellOrders[`${contract}-${identifier}-SELL`];

export const selectBuyOrder = (contract: string, identifier: BigInt) => (state: RootState /* */) =>
	state.orders.buyOrders[`${contract}-${identifier}-BUY`];

export default ordersSlice.reducer;
