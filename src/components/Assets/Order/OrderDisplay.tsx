import React from 'react';
import { Case, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { OrderDirection, selectOrderingStatus } from 'state/reducers/orders';
import Buy from './Buy';
import Sell from './Sell';

const OrderDisplay: React.FC = () => {
	const order = useSelector(selectOrderingStatus);

	return (
		<Switch>
			<Case condition={order.ordering && order.direction === OrderDirection.BOOK}>
				<Sell />
			</Case>
			<Case condition={order.ordering && order.direction === OrderDirection.EXECUTE}>
				<Buy />
			</Case>
		</Switch>
	);
};

export default OrderDisplay;
