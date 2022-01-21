import React from 'react';
import { useSelector } from 'react-redux';
import { areTherePendingTransactions } from 'state/reducers/transactions';
import { When } from 'react-if';

const TransactionsPending: React.FC = () => {
	const pendingTransactions = useSelector(areTherePendingTransactions);

	return (
		<When condition={pendingTransactions}>
			<div className="right-8 bottom-8 fixed">
				<div className="dark:bg-white p-4 rounded-lg shadow-lg">
					<div className="text-lights-300 spinner-border animate-spin inline-block w-12 h-12 bottom-4 rounded-full" role="status">
						<div className="hidden">Loading...</div>
					</div>
				</div>
			</div>
		</When>
	);
};

export default TransactionsPending;
