import { Provider, StaticJsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ABI, ABIs } from 'constants/abis';
import { Contract, errors } from 'ethers';
import { RootState } from 'state';
import { TRANSACTION_THRUNK_PREFIX } from './transactions';

export interface ApprovalsState {
	approved: { [C: string]: { [U: string]: string[] | undefined } | undefined };
}

const initialState: ApprovalsState = {
	approved: {}
};

export interface FetchContractApprovalParameters {
	contract: string;
	user: string;
	operator: string;
	provider: Provider;
}

export const fetchApprovalStatusTxr = createAsyncThunk<boolean, FetchContractApprovalParameters>(
	'fetch/contract/approval',
	async ({ contract, user, operator, provider }) => {
		const collection = new Contract(contract, ABIs[ABI.EIP721], provider);

		const isApproved: boolean = await collection.isApprovedForAll(user, operator);
		return isApproved;
	}
);

export interface SetContractApprovalParameters {
	contract: string;
	user: string;
	operator: string;
	approval: boolean;
	provider: StaticJsonRpcProvider;
}

export const setApprovalForAllTxw = createAsyncThunk<true, SetContractApprovalParameters>(
	`${TRANSACTION_THRUNK_PREFIX}set/contract/approval`,
	async ({ contract, operator, provider, approval }, { rejectWithValue }) => {
		const collection = new Contract(contract, ABIs[ABI.EIP721], provider.getSigner());

		try {
			const tx: TransactionResponse = await collection.setApprovalForAll(operator, approval);

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

export interface ApprovalForAllSetPayload {
	contract: string;
	user: string;
	operator: string;
	approval: boolean;
}

// TODO: this way of storing data isn't chain agnostic
export const approvalsSlice = createSlice({
	name: 'approvals',
	initialState,
	reducers: {
		setApprovalForAll: (state, action: PayloadAction<ApprovalForAllSetPayload>) => {
			state.approved[action.payload.contract] ??= {};
			const operators = new Set(state.approved[action.payload.contract]![action.payload.user] || []);

			action.payload.approval ? operators.add(action.payload.operator) : operators.delete(action.payload.operator);
			state.approved[action.payload.contract]![action.payload.user] = [...operators.keys()];
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchApprovalStatusTxr.fulfilled, (state, action) => {
				state.approved[action.meta.arg.contract] ??= {};
				const operators = new Set(state.approved[action.meta.arg.contract]![action.meta.arg.user] || []);

				action.payload ? operators.add(action.meta.arg.operator) : operators.delete(action.meta.arg.operator);
				state.approved[action.meta.arg.contract]![action.meta.arg.user] = [...operators.keys()];
			})
			.addCase(setApprovalForAllTxw.fulfilled, (state, action) => {
				state.approved[action.meta.arg.contract] ??= {};
				const operators = new Set(state.approved[action.meta.arg.contract]![action.meta.arg.user] || []);

				action.meta.arg.approval ? operators.add(action.meta.arg.operator) : operators.delete(action.meta.arg.operator);
				state.approved[action.meta.arg.contract]![action.meta.arg.user] = [...operators.keys()];
			});
	}
});

export const { setApprovalForAll } = approvalsSlice.actions;

export const selectOperators = (contract: string, user: string) => (state: RootState) => (state.approvals.approved[contract] || {})[user] || [];
export const selectOperatorApproval = (contract: string, user: string, operator: string) => (state: RootState) =>
	((state.approvals.approved[contract] || {})[user] || []).includes(operator);

export default approvalsSlice.reducer;
