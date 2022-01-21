import {
	ActionCreatorWithPreparedPayload,
	createSlice,
	isAllOf,
	isAnyOf,
	isFulfilled,
	isPending,
	isRejected,
	isRejectedWithValue
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { AnyAction } from 'redux';
import { RootState } from 'state';

export type GenericAsyncThunk = ActionCreatorWithPreparedPayload<any, any, any>;
export const TRANSACTION_THRUNK_PREFIX = 'transaction.';
export const isTransactionAction = (action: AnyAction): action is ReturnType<GenericAsyncThunk> => {
	return (action.type as string).startsWith(TRANSACTION_THRUNK_PREFIX);
};

export interface TransactionsState {
	pending: string[];
}

const initialState: TransactionsState = {
	pending: []
};

const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		clearPendingTransactions: (state) => {
			state.pending = [];
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isAllOf(isTransactionAction, isAnyOf(isPending)), (state, action) => {
				state.pending.push(action.meta.requestId);
			})
			.addMatcher(isAllOf(isTransactionAction, isAnyOf(isRejected, isRejectedWithValue)), (state, action) => {
				state.pending = state.pending.filter((tx) => tx !== action.meta.requestId);
				toast.error('Transaction failed.');
			})
			.addMatcher(isAllOf(isTransactionAction, isAnyOf(isFulfilled)), (state, action) => {
				state.pending = state.pending.filter((tx) => tx !== action.meta.requestId);
				toast.success('Transaction successfully executed.');
			});
	}
});

export const { clearPendingTransactions } = transactionsSlice.actions;

export const areTherePendingTransactions = (state: RootState) => state.transactions.pending.length > 0;

export default transactionsSlice.reducer;
