import { configureStore } from '@reduxjs/toolkit';
import approvalsReducer, { approvalsSlice } from './reducers/approvals';
import assetsReducer, { assetsSlice } from './reducers/assets';
import bridgingReducer, { bridgingSlice } from './reducers/bridging';
import collectionsReducer, { collectionsSlice } from './reducers/collections';
import ordersReducer, { ordersSlice } from './reducers/orders';
import transactionsReducer, { transactionsSlice } from './reducers/transactions';
import userReducer, { userSlice } from './reducers/user';

export const store = configureStore({
	reducer: {
		approvals: approvalsReducer,
		assets: assetsReducer,
		bridging: bridgingReducer,
		collections: collectionsReducer,
		orders: ordersReducer,
		transactions: transactionsReducer,
		user: userReducer
	},
	devTools: {
		actionCreators: {
			...approvalsSlice.actions,
			...assetsSlice.actions,
			...bridgingSlice.actions,
			...collectionsSlice.actions,
			...ordersSlice.actions,
			...transactionsSlice.actions,
			...userSlice.actions
		}
	}
});

export const useStoreDispatch = () => store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
