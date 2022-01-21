import dynamic from 'next/dynamic';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import OrderDisplay from './OrderManipulation/OrderDisplay';
import TransactionsPending from './Transactions/TransactionsPending';

const Connect = dynamic(() => import('components/Connect/Connect'), { ssr: false });

const PinnedComponents: React.FC = (props) => {
	return (
		<>
			<Toaster position="top-right" />
			<Connect />
			<OrderDisplay />
			<TransactionsPending />
			<>{props.children}</>
		</>
	);
};

export default PinnedComponents;
