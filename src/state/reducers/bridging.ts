import { StaticJsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SupportedChainId } from 'constants/chains';
import { BigNumber, errors } from 'ethers';
import { l2NFTBridgeContract } from '../../utils/contracts';
import { TRANSACTION_THRUNK_PREFIX } from './transactions';

export interface BridgingState {
	bridgeHistory: { contract: string; tokenId: string }[];
}

const initialState: BridgingState = {
	bridgeHistory: []
};

export interface WithdrawNFTParameters {
	chainId: SupportedChainId;
	l2Contract: string;
	tokenId: string;
	l1Receiver?: string;
	l1Gas: number;
	provider: StaticJsonRpcProvider;
}

export const withdrawNFTTxw = createAsyncThunk<true, WithdrawNFTParameters>(
	`${TRANSACTION_THRUNK_PREFIX}execute/contract/l2tl1Bridge`,
	async ({ chainId, l2Contract, tokenId, l1Receiver, l1Gas, provider }, { rejectWithValue }) => {
		const bridge = l2NFTBridgeContract(chainId, provider.getSigner());

		try {
			const txT = l1Receiver
				? bridge.withdrawTo(l2Contract, l1Receiver, BigNumber.from(tokenId), l1Gas)
				: bridge.withdraw(l2Contract, BigNumber.from(tokenId), l1Gas);
			const tx: TransactionResponse = await txT;

			try {
				await tx.wait();
			} catch (callException: any) {
				if (callException.code === errors.CALL_EXCEPTION) {
					return rejectWithValue(['Transaction execution failed', callException]);
				}
				throw callException;
			}
		} catch (transactionError) {
			return rejectWithValue(['Method call failed', transactionError]);
		}

		return true;
	}
);

// TODO: this way of storing data isn't chain agnostic
export const bridgingSlice = createSlice({
	name: 'brigding',
	initialState,
	// TODO: Reducer to set and clear history
	reducers: {},
	extraReducers: (builder) => {
		// TODO: Store "withdrawNFTTxw" in history
		builder;
	}
});

export const {} = bridgingSlice.actions;

export default bridgingSlice.reducer;
