import GenericModal from 'components/Modals/GenericModal';
import { SupportedChainId } from 'constants/chains';
import { ERC721_EXCHANGE } from 'constants/contracts';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearOrder,
	fetchApprovalStatus,
	OrderDirection,
	selectOrderingStatus,
	setApprovalForAll,
	updateCurrentOrderDirection
} from 'state/reducers/orders';

const Approve: React.FC = () => {
	const { library, account, chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;

	const baseProvider = useProviders()[chainIdNormalised];
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	useEffect(() => {
		if (!library || !account) return;

		dispatch(
			fetchApprovalStatus({
				contract: order.contract,
				operator: ERC721_EXCHANGE[chainIdNormalised],
				owner: account,
				provider: library || baseProvider
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (order.approved === true) dispatch(updateCurrentOrderDirection(OrderDirection.BOOK));

	return (
		<GenericModal
			show={order.ordering}
			onDialogClose={() => dispatch(clearOrder())}
			modalTitle="Approve Exchange spending"
			onTitleCloseClick={() => dispatch(clearOrder())}
		>
			<button
				disabled={!library}
				onClick={() => {
					dispatch(
						setApprovalForAll({
							contract: order.contract,
							operator: ERC721_EXCHANGE[chainIdNormalised],
							provider: library!
						})
					);
				}}
			>
				Approve
			</button>
		</GenericModal>
	);
};

export default Approve;
