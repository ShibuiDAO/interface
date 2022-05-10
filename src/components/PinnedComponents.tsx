import React from 'react';
import { Toaster } from 'react-hot-toast';
import OrderDisplayModal from './OrderManipulation/OrderDisplayModal';
import TransactionsPending from './Transactions/TransactionsPending';

const PinnedComponents: React.FC = (props) => {
	return (
		<>
			<Toaster position="top-right" />
			<OrderDisplayModal />
			<TransactionsPending />
			<>{props.children}</>
		</>
	);
};

export default PinnedComponents;
