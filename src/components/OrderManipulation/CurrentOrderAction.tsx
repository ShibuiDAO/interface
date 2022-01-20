import React from 'react';
import { useDispatch } from 'react-redux';
import { OrderDirection, OrderInitiate, setCurrentOrder } from 'state/reducers/orders';

export interface CurrentOrderActionProps<Direction extends OrderDirection = OrderDirection.APPROVE> {
	className?: string;
	direction: OrderDirection;
	data: Omit<OrderInitiate<Direction>, 'ordering' | 'direction'>;
}

function CurrentOrderAction<Direction extends OrderDirection = OrderDirection.APPROVE>({
	children,
	className,
	direction,
	data
}: React.PropsWithChildren<CurrentOrderActionProps<Direction>>): React.ReactElement {
	const dispatch = useDispatch();

	return (
		<>
			<button
				onClick={() =>
					dispatch(
						// @ts-expect-error Don't want to have to infinitely nest types
						setCurrentOrder({
							...data,
							ordering: true,
							direction
						})
					)
				}
				className={className}
			>
				{children}
			</button>
		</>
	);
}

export default CurrentOrderAction;
