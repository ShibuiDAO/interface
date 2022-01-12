import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

export const store = configureStore({
	reducer: {
		user: userReducer
	},
	devTools: true
});

export const useStoreDispatch = () => store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
