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
	collectionAssetsSearch: string;
}

const initialState: UserState = {
	connecting: false,
	triedEager: false,
	priceSorting: PriceSorting.LtH,
	collectionAssetsSearch: ''
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
		},

		setCollectionAssetsSearch: (state, action: PayloadAction<string>) => {
			state.collectionAssetsSearch = action.payload;
		},
		clearCollectionAssetsSearch: (state) => {
			state.collectionAssetsSearch = '';
		}
	}
});

export const { setConnectingStatus, setEagerAttempt, setPriceSorting, setCollectionAssetsSearch, clearCollectionAssetsSearch } = userSlice.actions;

export const selectConnectingStatus = (state: RootState) => state.user.connecting;
export const selectEagerAttempt = (state: RootState) => state.user.triedEager;
export const selectPriceSorting = (state: RootState) => state.user.priceSorting;
export const selectCollectionAssetsSearch = (state: RootState) => state.user.collectionAssetsSearch;

export default userSlice.reducer;
