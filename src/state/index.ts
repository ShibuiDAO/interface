import { configureStore } from '@reduxjs/toolkit';
import assetsReducer, { assetsSlice } from './reducers/assets';
import collectionsReducer, { collectionsSlice } from './reducers/collections';
import ordersReducer, { ordersSlice } from './reducers/orders';
import transactionsReducer, { transactionsSlice } from './reducers/transactions';
import userReducer, { userSlice } from './reducers/user';

export const store = configureStore({
	reducer: {
		assets: assetsReducer,
		collections: collectionsReducer,
		orders: ordersReducer,
		transactions: transactionsReducer,
		user: userReducer
	},
	devTools: {
		actionCreators: {
			...assetsSlice.actions,
			...collectionsSlice.actions,
			...ordersSlice.actions,
			...transactionsSlice.actions,
			...userSlice.actions
		}
	}
});

export const useStoreDispatch = () => store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
