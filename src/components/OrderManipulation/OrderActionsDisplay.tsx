import React from 'react';
import { Case, Switch } from 'react-if';
import { useSelector } from 'react-redux';
import { OrderDirection, selectOrderingStatus } from 'state/reducers/orders';
import Approve from './states/Approve';
import Cancel from './states/Cancel';
import Exercise from './states/Exercise';
import Sell from './states/Sell';

const OrderActionsDisplay: React.FC = () => {
	const order = useSelector(selectOrderingStatus());

	return (
		<Switch>
			<Case condition={order.ordering && order.direction === OrderDirection.APPROVE}>
				<Approve />
			</Case>
			<Case condition={order.ordering && order.direction === OrderDirection.BOOK}>
				<Sell />
			</Case>
			<Case condition={order.ordering && order.direction === OrderDirection.CANCEL}>
				<Cancel />
			</Case>
			<Case condition={order.ordering && order.direction === OrderDirection.EXERCISE}>
				<Exercise />
			</Case>
		</Switch>
	);
};

export default OrderActionsDisplay;
