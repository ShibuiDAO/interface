import React from 'react';
import { useSelector } from 'react-redux';
import { areTherePendingTransactions } from 'state/reducers/transactions';
import { When } from 'react-if';

const TransactionsPending: React.FC = () => {
	const pendingTransactions = useSelector(areTherePendingTransactions);

	return (
		<When condition={pendingTransactions}>
			<div className="fixed right-8 bottom-8">
				<div className="rounded-lg p-4 shadow-lg dark:bg-white">
					<div className="spinner-border bottom-4 inline-block h-12 w-12 animate-spin rounded-full text-lights-300" role="status">
						<div className="hidden">Loading...</div>
					</div>
				</div>
			</div>
		</When>
	);
};

export default TransactionsPending;
