import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrderingStatus } from 'state/reducers/orders';
import SellForm from '../forms/SellForm';

const Sell: React.FC = () => {
	const order = useSelector(selectOrderingStatus());

	return <SellForm contract={order.contract} identifier={order.identifier} />;
};

export default Sell;
