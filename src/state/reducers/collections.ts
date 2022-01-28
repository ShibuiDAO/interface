import type { Provider } from '@ethersproject/providers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ABI, ABIs } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import { RootState } from 'state';

export interface CollectionsState {
	info: { [K: string]: ChainedCollectionInfo | undefined };
}

const initialState: CollectionsState = {
	info: {}
};

export interface CollectionInfo {
	address: string;
	name: string;
}

export interface ChainedCollectionInfo extends CollectionInfo {
	chainId: SupportedChainId;
}

export interface FetchCollectionInfoParameters {
	chainId: number;
	address: string;
	contractABI?: ABI;
	provider: Provider;
}

export interface CollectionInfoSetPayload {
	chainId: SupportedChainId;
	contract: string;
	data: ChainedCollectionInfo;
}

export const fetchCollectionInfo = createAsyncThunk<ChainedCollectionInfo, FetchCollectionInfoParameters>(
	'fetch/metadata/collection',
	async ({ address, contractABI, chainId, provider }, { rejectWithValue }) => {
		if (!chainId || !contractABI) return rejectWithValue('ChainId or contract not provided.');

		const info: ChainedCollectionInfo = { chainId, address, name: '' };
		const contract = new Contract(address, ABIs[contractABI], provider);

		try {
			if (!info.name) info.name = await contract.name();
		} catch {}

		return info;
	}
);

export const collectionsSlice = createSlice({
	name: 'collections',
	initialState,
	reducers: {
		setCollectionInfo: (state, action: PayloadAction<CollectionInfoSetPayload>) => {
			state.info[`${action.payload.chainId}-${action.payload.contract}`] = action.payload.data;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCollectionInfo.fulfilled, (state, action) => {
			state.info[`${action.payload.chainId}-${action.payload.address}`] = action.payload;
		});
	}
});

export const { setCollectionInfo } = collectionsSlice.actions;

export const selectCollectionInfo = (chainId: SupportedChainId, contract: string) => (state: RootState) =>
	state.collections.info[`${chainId}-${contract}`];

export default collectionsSlice.reducer;
