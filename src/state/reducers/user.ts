import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export enum PriceSorting {
	LtH,
	HtL
}

export interface UserState {
	connecting: boolean;
	triedEager: boolean;
	priceSorting: PriceSorting;
}

const initialState: UserState = {
	connecting: false,
	triedEager: false,
	priceSorting: PriceSorting.LtH
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setConnectingStatus: (state, action: PayloadAction<boolean>) => {
			state.connecting = action.payload;
		},
		setEagerAttempt: (state, action: PayloadAction<boolean>) => {
			state.triedEager = action.payload;
		},
		setPriceSorting: (state, action: PayloadAction<PriceSorting>) => {
			state.priceSorting = action.payload;
		}
	}
});

export const { setConnectingStatus, setEagerAttempt, setPriceSorting } = userSlice.actions;

export const selectConnectingStatus = (state: RootState) => state.user.connecting;
export const selectEagerAttempt = (state: RootState) => state.user.triedEager;
export const selectPriceSorting = (state: RootState) => state.user.priceSorting;

export default userSlice.reducer;
