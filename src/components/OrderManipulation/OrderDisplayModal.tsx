import GenericModal from 'components/Modals/GenericModal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, selectOrderingStatus } from 'state/reducers/orders';
import OrderDisplay from './OrderDisplay';

const OrderDisplayModal: React.FC = () => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	return (
		<>
			<GenericModal
				show={order.ordering}
				onDialogClose={() => dispatch(clearOrder())}
				modalTitle={order.title || 'NFT Display'}
				onTitleCloseClick={() => dispatch(clearOrder())}
			>
				<OrderDisplay />
			</GenericModal>
		</>
	);
};

export default OrderDisplayModal;
