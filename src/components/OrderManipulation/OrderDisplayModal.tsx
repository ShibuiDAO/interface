import GenericModal from 'components/Modals/GenericModal';
import ProtectedMultiSourceContentDisplay from 'components/ProtectedMultiSourceContentDisplay';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { selectCollectionInfo } from 'state/reducers/collections';
import { clearOrder, OrderDirection, selectOrderingStatus, updateCurrentOrderDirection } from 'state/reducers/orders';
import { ExplorerType, formatExplorerLink, shortenHex } from 'utils/utils';
import OrderActionsDisplay from './OrderActionsDisplay';

const OrderDisplayModal: React.FC = () => {
	const { chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	const info = useSelector(selectCollectionInfo(chainIdNormalised, order.contract));
	const metadata = useSelector(selectAssetMetadata(chainIdNormalised, order.contract, order.identifier as unknown as bigint));

	if (order.direction === OrderDirection.DISPLAY) dispatch(updateCurrentOrderDirection(OrderDirection.APPROVE));

	return (
		<>
			<GenericModal
				show={order.ordering}
				onDialogClose={() => dispatch(clearOrder())}
				modalTitle={order.title || ''}
				onTitleCloseClick={() => dispatch(clearOrder())}
			>
				<div className="p-6">
					<div className="grid grid-cols-2 gap-12">
						<div>
							<ProtectedMultiSourceContentDisplay
								src={metadata?.image_final || ''}
								fallback="/logo_inverted_spaced.svg"
								className="max-h-[23rem] min-h-[23rem] min-w-[23rem] max-w-[23rem] rounded-lg border dark:border-lights-100"
							/>
						</div>
						<div className="flex flex-col">
							<div>
								<h2 className="text-sm font-normal">{info?.name || ''}</h2>
								<h3 className="pt-6 text-3xl font-bold">{metadata?.name || ''}</h3>
								<div className="pt-8 text-xs font-normal">
									Owned by{' '}
									<a
										href={formatExplorerLink(ExplorerType.Account, [chainIdNormalised, metadata?.owner || ''])}
										target="_blank"
										rel="noopener noreferrer"
										className="text-special-link"
									>
										{shortenHex(metadata?.owner || '', 4)}
									</a>
								</div>
							</div>
							<div className="mt-7 h-full rounded-lg border dark:border-lights-100">
								<div className="min-h-full min-w-full p-5">
									<OrderActionsDisplay />
								</div>
							</div>
						</div>
					</div>
				</div>
			</GenericModal>
		</>
	);
};

export default OrderDisplayModal;
