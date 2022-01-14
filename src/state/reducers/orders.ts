import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SellOrder } from '@tapioca-market/erc721exchange-types';

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

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setSellOrder: (state, action: PayloadAction<SellOrder>) => {
			state.sellOrders[`${action.payload.seller.id}-${action.payload.contract.id}-${action.payload.token}`] = {
				id: action.payload.id,
				seller: { id: action.payload.seller.id },
				contract: { id: action.payload.contract.id },
				token: action.payload.token,
				expiration: action.payload.expiration,
				price: action.payload.price
			};
		}
	}
});

export const { setSellOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
