import React from 'react';
import { Case, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { OrderDirection, selectOrderingStatus } from 'state/reducers/orders';
import Approve from './Approve';
import Sell from './Sell';

const OrderDisplay: React.FC = () => {
	const order = useSelector(selectOrderingStatus);

	return (
		<Switch>
			<Case condition={order.ordering && order.direction === OrderDirection.APPROVE}>
				<Approve />
			</Case>
			<Case condition={order.ordering && order.direction === OrderDirection.BOOK}>
				<Sell />
			</Case>
		</Switch>
	);
};

export default OrderDisplay;
