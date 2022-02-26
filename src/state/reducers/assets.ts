import type { Provider } from '@ethersproject/providers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ABI, ABIs, uriMethods } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import type { BaseMetadata } from 'types/metadata';
import type { Token } from 'types/token';
import { metadataAPI, metadataBase64 } from 'utils/metadata';
import { quirkURIQuirks } from 'utils/quirks/uri';
import type { RootState } from '../index';

export interface AssetsState {
	metadata: { [K: string]: ExpandedChainedMetadata | undefined };
}

const initialState: AssetsState = {
	metadata: {}
};

export interface ChainedMetadata extends BaseMetadata {
	chainId: SupportedChainId;
}

export interface ExpandedChainedMetadata extends ChainedMetadata {
	owner: string;
}

export interface FetchAssetMetadataParameters {
	token: Token;
	chainId: number;
	contractABI?: ABI;
	provider: Provider;
}

export interface AssetMetadataSetPayload {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
	data: ExpandedChainedMetadata;
}

export const fetchAssetMetadata = createAsyncThunk<ExpandedChainedMetadata, FetchAssetMetadataParameters>(
	'fetch/metadata/asset',
	async ({ token, contractABI, chainId, provider }, { rejectWithValue }) => {
		if (!chainId || !contractABI) return rejectWithValue('ChainId or contract not provided.');

		const contract = new Contract(token.contract.id, ABIs[contractABI], provider);
		const contractURI: string = await contract[uriMethods[contractABI]](token.identifier);
		let metadata: BaseMetadata = { name: '', image_final: '' };
		const [uri, protocol, shouldProxy] = quirkURIQuirks(contractURI);

		if (protocol === 'data:') {
			const [_metadata] = await metadataBase64(uri);
			if (_metadata) metadata = _metadata;
		} else if (protocol.includes('http') || protocol === 'ipfs:') {
			const [_metadata] = await metadataAPI(uri, shouldProxy);
			if (_metadata) metadata = _metadata;
		}

		await provider.getNetwork();

		try {
			if (!metadata.collection) metadata.collection = await contract.name();
		} catch {}

		return metadata
			? {
					...metadata,
					owner: token.owner,
					name: metadata.name || token.identifier.toString(),
					contract: token.contract.id,
					identifier: token.identifier,
					collection: metadata.collection || token.contract.name || `Unidentified contract ${token.contract.id}`,
					image_final: metadata.image || metadata.image_url || '',
					chainId
			  }
			: rejectWithValue('No metadata present');
	}
);

export const assetsSlice = createSlice({
	name: 'assets',
	initialState,
	reducers: {
		setAssetMetadata: (state, action: PayloadAction<AssetMetadataSetPayload>) => {
			state.metadata[`${action.payload.chainId}-${action.payload.contract}-${action.payload.identifier}`] = action.payload.data;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAssetMetadata.fulfilled, (state, action) => {
			state.metadata[`${action.payload.chainId}-${action.payload.contract}-${action.payload.identifier}`] = action.payload;
		});
	}
});

export const { setAssetMetadata } = assetsSlice.actions;

export const selectAssetMetadata = (chainId: SupportedChainId, contract: string, identifier: BigInt) => (state: RootState) =>
	state.assets.metadata[`${chainId}-${contract}-${identifier}`];

export default assetsSlice.reducer;
