import GenericModal from 'components/Modals/GenericModal';
import ProtectedMultiSourceContentDisplay from 'components/ProtectedMultiSourceContentDisplay';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { clearOrder, selectOrderingStatus } from 'state/reducers/orders';
import OrderActionsDisplay from './OrderActionsDisplay';

const OrderDisplayModal: React.FC = () => {
	const { chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	const metadata = useSelector(selectAssetMetadata(chainIdNormalised, order.contract, order.identifier as unknown as bigint));

	return (
		<>
			<GenericModal
				show={order.ordering}
				onDialogClose={() => dispatch(clearOrder())}
				modalTitle={order.title || ''}
				onTitleCloseClick={() => dispatch(clearOrder())}
			>
				<div className="p-12">
					<ProtectedMultiSourceContentDisplay
						src={metadata?.image_final || ''}
						fallback="/logo_inverted_spaced.svg"
						className="max-h-[23rem] min-h-[23rem] min-w-[23rem] max-w-[23rem]"
					/>
					hello
					<OrderActionsDisplay />
				</div>
			</GenericModal>
		</>
	);
};

export default OrderDisplayModal;
