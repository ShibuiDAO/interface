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
	contractNames: Record<string, string>;
	metadata: { [K: string]: ExpandedChainedMetadata | undefined };
}

const initialState: AssetsState = {
	contractNames: {},
	metadata: {}
};

export interface ChainedMetadata extends BaseMetadata {
	chainId: SupportedChainId;
}

export interface ExpandedChainedMetadata extends ChainedMetadata {
	owner: string;
	rawContractName?: string;
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

export const fetchAssetMetadataTxr = createAsyncThunk<ExpandedChainedMetadata, FetchAssetMetadataParameters>(
	'fetch/metadata/asset',
	async ({ token, contractABI, chainId, provider }, { rejectWithValue, getState }) => {
		if (!chainId || !contractABI) return rejectWithValue('ChainId or contract not provided.');

		const state = getState() as RootState;
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

		if (state.assets.contractNames[token.contract.id]) metadata.collection = state.assets.contractNames[token.contract.id];
		try {
			if (!metadata.collection && !state.assets.contractNames[token.contract.id]) {
				metadata.collection = await contract.name();
				state.assets.contractNames[token.contract.id] = metadata.collection!;
			}
		} catch {}

		return metadata
			? {
					...metadata,
					owner: token.owner,
					name: metadata.name || token.identifier.toString(),
					contract: token.contract.id,
					identifier: token.identifier,
					collection: metadata.collection || token.contract.name || `Unidentified contract ${token.contract.id}`,
					image_final: metadata.image || metadata.image_url || metadata.image_data || '',
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
		builder.addCase(fetchAssetMetadataTxr.fulfilled, (state, action) => {
			state.metadata[`${action.payload.chainId}-${action.payload.contract}-${action.payload.identifier}`] = action.payload;
			if (action.payload.rawContractName && action.payload.contract)
				state.contractNames[action.payload.contract] = action.payload.rawContractName;
		});
	}
});

export const { setAssetMetadata } = assetsSlice.actions;

export const selectAssetMetadata = (chainId: SupportedChainId, contract: string, identifier: BigInt) => (state: RootState) =>
	state.assets.metadata[`${chainId}-${contract}-${identifier}`];

export default assetsSlice.reducer;
