import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export enum PriceSorting {
	LtH,
	HtL
}

export interface UserState {
	priceSorting: PriceSorting;
	collectionAssetsSearch: string;
}

const initialState: UserState = {
	priceSorting: PriceSorting.LtH,
	collectionAssetsSearch: ''
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
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

export const { setPriceSorting, setCollectionAssetsSearch, clearCollectionAssetsSearch } = userSlice.actions;

export const selectPriceSorting = (state: RootState) => state.user.priceSorting;
export const selectCollectionAssetsSearch = (state: RootState) => state.user.collectionAssetsSearch;

export default userSlice.reducer;
