import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from './reducers/assets';
import ordersReducer from './reducers/orders';
import transactionsReducer from './reducers/transactions';
import userReducer from './reducers/user';

export const store = configureStore({
	reducer: {
		assets: assetsReducer,
		orders: ordersReducer,
		transactions: transactionsReducer,
		user: userReducer
	},
	devTools: true
});

export const useStoreDispatch = () => store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
