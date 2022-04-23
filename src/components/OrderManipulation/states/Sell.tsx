import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrderingStatus } from 'state/reducers/orders';
import SellForm from '../forms/SellForm';

const Sell: React.FC = () => {
	const order = useSelector(selectOrderingStatus());

	return (
		<>
			<div className="min-h-full p-5 dark:bg-darks-400">
				<SellForm contract={order.contract} identifier={order.identifier} />
			</div>
		</>
	);
};

export default Sell;
