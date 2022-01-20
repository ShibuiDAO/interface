import dynamic from 'next/dynamic';
import React from 'react';
import OrderDisplay from './OrderManipulation/OrderDisplay';

const Connect = dynamic(() => import('components/Connect/Connect'), { ssr: false });

const PinnedComponents: React.FC = (props) => {
	return (
		<>
			<Connect />
			<OrderDisplay />
			<>{props.children}</>
		</>
	);
};

export default PinnedComponents;
