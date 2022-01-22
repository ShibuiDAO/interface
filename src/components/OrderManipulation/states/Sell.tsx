import GenericModal from 'components/Modals/GenericModal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, selectOrderingStatus } from 'state/reducers/orders';
import SellForm from '../forms/SellForm';

const Sell: React.FC = () => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	return (
		<GenericModal
			show={order.ordering}
			onDialogClose={() => dispatch(clearOrder())}
			modalTitle="Sell NFT"
			onTitleCloseClick={() => dispatch(clearOrder())}
		>
			<SellForm contract={order.contract} identifier={order.identifier} />
		</GenericModal>
	);
};

export default Sell;
